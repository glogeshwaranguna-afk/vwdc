from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# --- LandGuard AI Assistant (Claude Sonnet 4.6 via Emergent Universal Key) ---
import json
from fastapi.responses import StreamingResponse
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
assistant_sessions = {}

ASSISTANT_SYSTEM = """You are the LandGuard AI Assistant, an explainable-AI copilot inside a government land-acquisition intelligence dashboard. You help officers understand predictive delay risk and decide mitigations.

Current portfolio snapshot:
- 18 active acquisition projects across 10 districts; 11 at risk; average delay probability 56% (weighted mean); 6 critical projects needing immediate action.
- Risk distribution: Critical 6, High 5, Medium 5, Low 2.
- Monthly delay probability trend: Feb 40%, Mar 48%, Apr 55%, May 53%, Jun 61%, Jul 58%, Aug 68%, Sep 73% — steadily rising.
- District-wise average delay risk: Bhopal 71% (critical), Nagpur 66%, Ahmedabad 62%, Jaipur 58%, Pune 53%, Lucknow 49%, Patna 44%, Bengaluru 38%.
- Top delay factors: Pending Compensation (12 projects), Pending Approval (9), Legal Dispute (7), Incomplete Documentation (6), Stakeholder Delay (4).

Key project records:
- LA-1011 Delhi-Mumbai Corridor Segment 14 (Irrigation, Pune, Maharashtra): risk score 94 CRITICAL, 91% delay probability, predicted delay ~90 days, stage Compensation, 590 affected families, 175 ha, legal dispute active, compensation partial — ₹27.58 Cr paid of ₹50.15 Cr, 288 pending beneficiary cases. SHAP drivers: Pending Compensation +32%, Pending Approval +25%, Legal Dispute +18%, Incomplete Documentation +11%, Slow Stakeholder Response +6%, Weather/Terrain +4%.
- LA-1695 Bhopal Industrial Corridor: risk 91 CRITICAL, stage Verification, compensation pending.
- LA-1083 Jaipur Metro Line 2: risk 87 CRITICAL, stage Survey, legal dispute.
- LA-1018 Coimbatore Metro Extension: risk 87 CRITICAL, stage Compensation.
- LA-1699 Chennai Coastal Highway: risk 86 CRITICAL, beneficiary payouts stalled 21 days.
- LA-1005 Bhopal Industrial Corridor Phase 2: risk 85 CRITICAL, compensation stalled.
- LA-1007 Ahmedabad-Dholera Freight Line: risk 78 HIGH, R&R in progress (0.24d pending).
- LA-3084 Ganga Canal Modernization (Lucknow): risk 48 MEDIUM, admin approval due in 2 days (approaching SLA).

Recent alerts: LA-1011 at 84% delay risk needing immediate intervention (12 min ago); LA-1005 crossed critical threshold (48 min ago); LA-1699 compensation pending 21 days (2 hrs ago); LA-1697 legal dispute escalation (6 hrs ago); LA-3084 approval SLA limit approaching (7 hrs ago).

Top AI recommendations: P1 resolve pending compensation verification (342 families, Revenue Dept, -28 risk pts); P2 fast-track collector approval for LA-1695 (District Collectorate, -19 pts); P3 digitise incomplete land records (6 projects, Land Records, -12 pts); P4 mediate LA-1697 ownership dispute (Legal Cell, -9 pts).

Answer concisely (2-6 sentences or a short bullet list), ground every claim in this data, and when relevant end with one concrete recommended action. Use INR context (crores) for compensation. If asked about something outside land-acquisition intelligence, politely steer back to the portfolio."""

class AssistantChatRequest(BaseModel):
    session_id: str
    message: str

@api_router.post("/assistant/chat")
async def assistant_chat(req: AssistantChatRequest):
    chat = assistant_sessions.get(req.session_id)
    if chat is None:
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=req.session_id,
            system_message=ASSISTANT_SYSTEM,
        ).with_model("anthropic", "claude-sonnet-4-6")
        assistant_sessions[req.session_id] = chat

    await db.assistant_messages.insert_one({
        "session_id": req.session_id,
        "role": "user",
        "content": req.message,
        "ts": datetime.now(timezone.utc).isoformat(),
    })

    async def event_stream():
        reply = ""
        try:
            async for ev in chat.stream_message(UserMessage(text=req.message)):
                if isinstance(ev, TextDelta):
                    reply += ev.content
                    yield f"data: {json.dumps({'delta': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception as exc:
            yield f"data: {json.dumps({'error': str(exc)})}\n\n"
        if reply:
            await db.assistant_messages.insert_one({
                "session_id": req.session_id,
                "role": "assistant",
                "content": reply,
                "ts": datetime.now(timezone.utc).isoformat(),
            })
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

@api_router.get("/assistant/history")
async def assistant_history(session_id: str):
    docs = await db.assistant_messages.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("ts", 1).to_list(200)
    return {"messages": docs}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()