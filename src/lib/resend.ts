import { Resend } from "resend";

const globalForResend = global as unknown as { resend: Resend | undefined };

export const resend =
  globalForResend.resend ?? new Resend(process.env.RESEND_API_KEY || "default_api_key_placeholder");

if (process.env.NODE_ENV !== "production") globalForResend.resend = resend;
