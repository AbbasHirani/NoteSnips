export const dynamic = "force-dynamic";
import { ResetPasswordForm } from "@/components/forms/reset-password"
import { Suspense } from "react"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | NoteSnips",
  description: "Set a new password for your NoteSnips account",
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
