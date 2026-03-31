"use client";

import { useState } from "react";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectPath = redirect || "../japan-2026";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/pin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (res.ok) {
        window.location.href = redirectPath;
      } else {
        setError("PIN incorrecto");
        setPin("");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#FAF6F1" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl block" aria-hidden="true">
            🍁
          </span>
          <h1
            className="mt-4 text-2xl font-light tracking-wide"
            style={{ color: "#2C2420", fontFamily: "Georgia, serif" }}
          >
            Área privada
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#7A6E64" }}>
            Introduce el PIN para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            autoComplete="off"
            autoFocus
            className="w-full px-4 py-3 text-center text-lg tracking-[0.5em] rounded-lg border outline-none transition-colors focus:ring-0"
            style={{
              background: "#FFFFFF",
              borderColor: error ? "#C4553A" : "#E5DDD4",
              color: "#2C2420",
            }}
          />

          {error && (
            <p className="text-center text-sm" style={{ color: "#C4553A" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full py-3 rounded-lg text-sm font-medium tracking-wide transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            style={{ background: "#C4553A", color: "#FAF6F1" }}
          >
            {loading ? "Verificando..." : "Acceder"}
          </button>
        </form>
      </div>
    </div>
  );
}
