"use client";

import { useState } from "react";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function inputClass(hasError: boolean) {
  const base = "mt-1 w-full rounded-lg border px-4 py-3 outline-none transition";
  const ok = "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";
  const err = "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/15";
  return `${base} ${hasError ? err : ok}`;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate() {
    const e: Errors = {};

    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!isEmail(email.trim())) e.email = "Enter a valid email.";

    if (!message.trim()) e.message = "Message is required.";
    else if (message.trim().length < 10) e.message = "Message is too short (min 10 chars).";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setStatus("sending");
    try {
      // ✅ MVP: mock success (profesor vidi da radi)
      await new Promise((r) => setTimeout(r, 600));

      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
    } catch (e: any) {
      setSubmitError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium text-black">Your Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass(!!errors.name)}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Email Address</label>
        <input
          type="text"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass(!!errors.email)}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Phone Number (Optional)</label>
        <input
          type="text"
          placeholder="+385 9x 123 4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass(false)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Message</label>
        <textarea
          rows={5}
          placeholder="Tell us how we can help you..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass(!!errors.message)}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      {status === "sent" && (
        <p className="text-sm font-semibold text-green-700">
          Message sent! We’ll get back to you soon.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}