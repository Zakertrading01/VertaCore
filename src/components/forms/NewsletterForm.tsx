"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        reset();
      } else {
        setError(json.error ?? "Subscription failed. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-success text-sm">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
        <span>You&apos;re subscribed. Thank you.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            {...register("email")}
            type="email"
            placeholder="Work email address"
            className={cn(
              "w-full h-10 px-3 bg-navy-light/40 border border-steel/40 rounded-lg text-sm text-surface placeholder:text-steel-muted focus:outline-none focus:border-gold/60 transition-colors",
              errors.email && "border-error/60",
            )}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-shrink-0 h-10 px-4 bg-gold text-navy font-semibold text-sm rounded-lg hover:bg-gold-muted transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          {!compact && <span>Subscribe</span>}
        </button>
      </div>

      {(errors.email || error) && (
        <p className="mt-1.5 text-xs text-error">
          {errors.email?.message ?? error}
        </p>
      )}
    </form>
  );
}
