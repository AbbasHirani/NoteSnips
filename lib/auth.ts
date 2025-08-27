import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "../db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "../components/emails/verification-email";
import PasswordReset from "@/components/emails/email-reset";

const resend = new Resend(process.env.RESEND_API_KEY); 

export const auth = betterAuth({

   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  
    emailAndPassword: {
    enabled: true, 
     sendResetPassword: async ({user, url}) => {
      await resend.emails.send({
        from: 'NoteSnips <onboarding@resend.dev>',
        to: ['abbashirani154@gmail.com'],
        subject: 'Reset your password with NoteSnips',
        react: PasswordReset({
          userName: user.name,
          resetUrl: url,
          companyName: "NoteSnips",
          requestTime: new Date().toLocaleString(),
      })
      });
    },
     requireEmailVerification: true,
  },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
    }),

    plugins: [nextCookies()],

  emailVerification: {
  sendVerificationEmail: async ({ user, url }) => {
    try {
      const { data, error } = await resend.emails.send({
        from: 'NoteSnips <onboarding@resend.dev>',
        to: ['abbashirani154@gmail.com'],
        subject: 'Verify your email address with NoteSnips',
        react: VerificationEmail({ 
          userName: user.name, 
          verificationUrl: url,
          companyName: "NoteSnips" 
        }),
      });
      
      if (error) {
        console.error('Resend error:', error);
        return;
      }
      
      console.log('Email sent successfully:', data);
    } catch (err) {
      console.error('Failed to send verification email:', err);
    }
  },
  sendOnSignIn: true
}
});