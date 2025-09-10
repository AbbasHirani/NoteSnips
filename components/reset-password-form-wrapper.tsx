"use client"
import { Suspense } from "react"
import { ResetPasswordForm } from "./forms/reset-password"

export function ResetPasswordFormWrapper(props: React.ComponentProps<"div">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm {...props} />
    </Suspense>
  )
}
