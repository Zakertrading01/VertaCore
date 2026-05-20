"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(1, "Required").max(100),
  email: z.string().email("Enter a valid email"),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  subject: z.string().min(1, "Required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        reset();
      } else {
        setServerError(json.error ?? "Submission failed. Please try again.");
      }
    } catch {
      setServerError("An error occurred. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-success/10 border border-success/20 mb-5">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <h3 className="text-h3 font-bold text-surface mb-2">Message Sent</h3>
        <p className="text-body text-surface/60">
          We&apos;ll be in touch within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-surface/70 text-sm">
            Full Name <span className="text-error">*</span>
          </Label>
          <Input
            id="contact-name"
            {...register("name")}
            placeholder="Your name"
            className={cn(
              "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
              errors.name && "border-error/60",
            )}
          />
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="text-surface/70 text-sm">
            Email Address <span className="text-error">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            {...register("email")}
            placeholder="your@email.com"
            className={cn(
              "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
              errors.email && "border-error/60",
            )}
          />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-company" className="text-surface/70 text-sm">
            Company
          </Label>
          <Input
            id="contact-company"
            {...register("company")}
            placeholder="Company name"
            className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-phone" className="text-surface/70 text-sm">
            Phone
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            {...register("phone")}
            placeholder="+1 (555) 000 0000"
            className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-subject" className="text-surface/70 text-sm">
          Subject <span className="text-error">*</span>
        </Label>
        <Input
          id="contact-subject"
          {...register("subject")}
          placeholder="How can we help?"
          className={cn(
            "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
            errors.subject && "border-error/60",
          )}
        />
        {errors.subject && <p className="text-xs text-error">{errors.subject.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-surface/70 text-sm">
          Message <span className="text-error">*</span>
        </Label>
        <Textarea
          id="contact-message"
          {...register("message")}
          placeholder="Tell us about your requirements..."
          rows={5}
          className={cn(
            "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60 resize-none",
            errors.message && "border-error/60",
          )}
        />
        {errors.message && <p className="text-xs text-error">{errors.message.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3.5 rounded-lg hover:bg-gold-muted transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="h-5 w-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
