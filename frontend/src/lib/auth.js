const KEY = "landguard_session";

export function signIn({ email, name }) {
  const session = {
    email,
    name: name || (email === "admin@landguard.ai" ? "A. Sharma" : email.split("@")[0]),
    role: "Admin",
    ts: Date.now(),
  };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  localStorage.removeItem(KEY);
}

export function getSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function initialsOf(name = "") {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
