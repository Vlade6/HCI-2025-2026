import { Suspense } from "react";
import LoginClient from "./loginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-red-50 py-16" />}>
      <LoginClient />
    </Suspense>
  );
}
