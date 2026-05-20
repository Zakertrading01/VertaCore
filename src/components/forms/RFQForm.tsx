"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  firstName: z.string().min(1, "Required").max(100),
  lastName: z.string().min(1, "Required").max(100),
  email: z.string().email("Enter a valid work email"),
  phone: z.string().max(30).optional(),
  company: z.string().min(1, "Required").max(200),
  jobTitle: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  items: z.string().min(5, "Please describe what you need (min 5 characters)").max(2000),
  message: z.string().max(2000).optional(),
});

type FormData = z.infer<typeof schema>;

interface RFQFormProps {
  prefillItem?: string;
  source?: string;
  className?: string;
}

export function RFQForm({ prefillItem, source, className }: RFQFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: prefillItem ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: source ?? "contact" }),
      });
      const json = await res.json();
      if (json.success) {
        setRfqNumber(json.data?.rfqNumber ?? "");
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
      <div className={cn("text-center py-12", className)}>
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/10 border border-success/20 mb-6">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-h3 font-bold text-surface mb-2">
          Enquiry Received
        </h3>
        {rfqNumber && (
          <p className="text-sm text-steel-muted mb-1">
            Reference: <span className="text-gold font-semibold">{rfqNumber}</span>
          </p>
        )}
        <p className="text-body text-surface/60 max-w-sm mx-auto mt-3">
          Our technical team will review your requirements and respond within
          24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-5", className)}
      noValidate
      id="rfq"
    >
      {/* Step 1 — Contact */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-4">
          Contact Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-surface/70 text-sm">
              First Name <span className="text-error">*</span>
            </Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="First name"
              className={cn(
                "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
                errors.firstName && "border-error/60",
              )}
            />
            {errors.firstName && (
              <p className="text-xs text-error">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-surface/70 text-sm">
              Last Name <span className="text-error">*</span>
            </Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Last name"
              className={cn(
                "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
                errors.lastName && "border-error/60",
              )}
            />
            {errors.lastName && (
              <p className="text-xs text-error">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-surface/70 text-sm">
              Work Email <span className="text-error">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="name@company.com"
              className={cn(
                "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
                errors.email && "border-error/60",
              )}
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-surface/70 text-sm">
              Company <span className="text-error">*</span>
            </Label>
            <Input
              id="company"
              {...register("company")}
              placeholder="Company name"
              className={cn(
                "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
                errors.company && "border-error/60",
              )}
            />
            {errors.company && (
              <p className="text-xs text-error">{errors.company.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="jobTitle" className="text-surface/70 text-sm">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              {...register("jobTitle")}
              placeholder="e.g. Procurement Manager"
              className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-surface/70 text-sm">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+1 (555) 000 0000"
              className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="country" className="text-surface/70 text-sm">
              Country
            </Label>
            <Input
              id="country"
              {...register("country")}
              placeholder="Country"
              className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="industry" className="text-surface/70 text-sm">
              Industry / Sector
            </Label>
            <Input
              id="industry"
              {...register("industry")}
              placeholder="e.g. Oil & Gas"
              className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60"
            />
          </div>
        </div>
      </div>

      {/* Step 2 — Enquiry */}
      <div className="pt-2 border-t border-steel/20">
        <p className="text-xs font-semibold uppercase tracking-widest text-steel-muted mb-4">
          Enquiry Details
        </p>

        <div className="space-y-1.5">
          <Label htmlFor="items" className="text-surface/70 text-sm">
            What do you need? <span className="text-error">*</span>
          </Label>
          <Textarea
            id="items"
            {...register("items")}
            placeholder="Describe the equipment or materials you need — include quantities, specifications, and any relevant standards if known."
            rows={4}
            className={cn(
              "bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60 resize-none",
              errors.items && "border-error/60",
            )}
          />
          {errors.items && (
            <p className="text-xs text-error">{errors.items.message}</p>
          )}
        </div>

        <div className="space-y-1.5 mt-4">
          <Label htmlFor="message" className="text-surface/70 text-sm">
            Additional Notes
          </Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Delivery timeline, project context, or any other relevant information."
            rows={3}
            className="bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60 resize-none"
          />
        </div>
      </div>

      {serverError && (
        <p className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <div className="space-y-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3.5 rounded-lg hover:bg-gold-muted transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="h-5 w-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
          ) : (
            <>
              Submit Request for Quotation
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-steel-muted">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-gold" />
            We respond within 24 hours
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-gold" />
            ISO 9001:2015 Certified
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-gold" />
            No obligation
          </span>
        </div>
      </div>
    </form>
  );
}
