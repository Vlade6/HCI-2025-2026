"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/my_acc";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState(""); // email ili username za login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setMsg(null);
    setLoading(true);

    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        mode === "login"
          ? { identifier, password }
          : { username, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Auth failed");

      window.location.href = next
    } catch (e: any) {
      setMsg(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-red-50 py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-extrabold text-gray-900">
          {mode === "login" ? "Login" : "Create account"}
        </h1>

        <div className="mt-4 flex gap-2">
          <button
            className={`flex-1 rounded-lg py-2 font-semibold ${
              mode === "login" ? "bg-red-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 rounded-lg py-2 font-semibold ${
              mode === "register" ? "bg-red-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {mode === "register" && (
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          {mode === "login" ? (
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          ) : (
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {msg && <p className="text-sm text-red-600">{msg}</p>}

          <button
            className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white disabled:opacity-60"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </main>
  );
}
