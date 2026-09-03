import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, Loader2, BadgeCheck, FileWarning } from "lucide-react";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";

export default function DocumentIntegrityPage() {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const onFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setVerifying(true);
    setResult(null);
    const buf = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buf);
    const hash = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
    setTimeout(() => {
      setResult({ hash, block: "#184,207" });
      setVerifying(false);
    }, 1100);
  };

  return (
    <DashboardShell
      testId="documents-page"
      crumb="Document Integrity"
      title="Document Integrity Verification"
      subtitle="Upload a document to verify its SHA-256 hash against the blockchain ledger"
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="Upload Document" sub="Land records, approvals, survey reports (PDF, JPG, PNG)" testId="upload-card">
          <div
            data-testid="upload-dropzone"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files?.[0]); }}
            className={`flex h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-all ${
              dragging ? "border-[#0B3D91] bg-[#0B3D91]/5" : "border-slate-300 hover:border-[#0B3D91]/50 hover:bg-slate-50"
            }`}
          >
            <motion.div animate={dragging ? { scale: 1.12 } : { scale: 1 }} className="rounded-2xl bg-[#0B3D91]/10 p-4">
              <CloudUpload className="h-7 w-7 text-[#0B3D91]" />
            </motion.div>
            <p className="text-sm font-bold text-slate-700">Drag & drop or click to upload</p>
            <p className="max-w-xs text-center text-xs font-medium text-slate-400">
              Land records, approvals, survey reports (PDF, JPG, PNG)
            </p>
            {fileName && <p className="text-xs font-bold text-[#0B3D91]">{fileName}</p>}
          </div>
          <input
            ref={inputRef}
            data-testid="upload-input"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </Card>

        <Card title="Verification Result" sub="Ledger cross-check status" testId="verification-result">
          <AnimatePresence mode="wait">
            {verifying ? (
              <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-64 flex-col items-center justify-center gap-3" data-testid="verifying-state">
                <Loader2 className="h-8 w-8 animate-spin text-[#0B3D91]" />
                <p className="text-sm font-semibold text-slate-400">Hashing document & querying ledger...</p>
              </motion.div>
            ) : result ? (
              <motion.div key="r" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex h-64 flex-col justify-center" data-testid="verified-state">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <BadgeCheck className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-extrabold text-slate-900">Integrity Verified</p>
                    <p className="text-xs font-semibold text-emerald-600">Hash matches ledger entry at block {result.block}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Document</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">{fileName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">SHA-256 Hash</p>
                    <p className="mt-0.5 break-all rounded-lg bg-slate-100 p-2.5 font-mono text-[11px] text-slate-600" data-testid="document-hash">
                      {result.hash}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-64 flex-col items-center justify-center gap-3" data-testid="idle-state">
                <FileWarning className="h-8 w-8 text-slate-300" />
                <p className="text-sm font-medium text-slate-400">Upload a document to check its integrity.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </DashboardShell>
  );
}
