"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReCAPTCHA from "react-google-recaptcha";

export function ContactForm() {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = React.useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const handleRecaptchaChange = (token: string | null) => {
    setIsRecaptchaVerified(token !== null);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 pt-12">
      <form
        className="flex-1 flex flex-col sm:w-[600px] w-full gap-4"
        action="https://formsubmit.co/ionlyreadspam@gmail.com"
        method="POST"
      >
        <p className="text-sm text-foreground">
          Have a question or feedback? Use the form below to get in touch with
          us.
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 [&>textarea]:mb-3 mt-8">
          <Label htmlFor="subject">Subject</Label>
          <Input
            name="subject"
            placeholder="Subject"
            required
            className="text-lg"
          />

          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Your name"
            required
            className="text-lg"
          />

          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="text-lg"
          />

          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            placeholder="Your message"
            required
            className="min-h-[100px] text-lg"
          />

          {recaptchaSiteKey && (
            <div className="mb-4">
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={recaptchaSiteKey && !isRecaptchaVerified}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-lg disabled:opacity-50"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
