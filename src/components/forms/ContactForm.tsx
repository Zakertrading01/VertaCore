"use client";

import { useState, useRef, useEffect } from "react";
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
  countryCode: z.string().optional(),
  phone: z.string().max(30).optional(),
  subject: z.string().min(1, "Required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
});

const COUNTRY_CODES = [
  { code: "+1", label: "US/CA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+91", label: "IN (+91)" },
  { code: "+61", label: "AU (+61)" },
  { code: "+49", label: "DE (+49)" },
  { code: "+33", label: "FR (+33)" },
  { code: "+81", label: "JP (+81)" },
  { code: "+86", label: "CN (+86)" },
  { code: "+55", label: "BR (+55)" },
  { code: "+27", label: "ZA (+27)" },
  { code: "+39", label: "IT (+39)" },
  { code: "+34", label: "ES (+34)" },
  { code: "+31", label: "NL (+31)" },
  { code: "+41", label: "CH (+41)" },
  { code: "+46", label: "SE (+46)" },
  { code: "+47", label: "NO (+47)" },
  { code: "+45", label: "DK (+45)" },
  { code: "+358", label: "FI (+358)" },
  { code: "+65", label: "SG (+65)" },
  { code: "+60", label: "MY (+60)" },
  { code: "+62", label: "ID (+62)" },
  { code: "+66", label: "TH (+66)" },
  { code: "+82", label: "KR (+82)" },
  { code: "+966", label: "SA (+966)" },
  { code: "+974", label: "QA (+974)" },
  { code: "+965", label: "KW (+965)" },
  { code: "+973", label: "BH (+973)" },
  { code: "+968", label: "OM (+968)" },
  { code: "+20", label: "EG (+20)" },
  { code: "+212", label: "MA (+212)" },
  { code: "+234", label: "NG (+234)" },
  { code: "+254", label: "KE (+254)" },
  { code: "+52", label: "MX (+52)" },
  { code: "+54", label: "AR (+54)" },
  { code: "+56", label: "CL (+56)" },
  { code: "+57", label: "CO (+57)" },
  { code: "+51", label: "PE (+51)" },
  { code: "+92", label: "PK (+92)" },
  { code: "+880", label: "BD (+880)" },
  { code: "+94", label: "LK (+94)" },
  { code: "+977", label: "NP (+977)" },
  { code: "+353", label: "IE (+353)" },
  { code: "+351", label: "PT (+351)" },
  { code: "+30", label: "GR (+30)" },
  { code: "+43", label: "AT (+43)" },
  { code: "+32", label: "BE (+32)" },
  { code: "+48", label: "PL (+48)" },
  { code: "+420", label: "CZ (+420)" },
  { code: "+36", label: "HU (+36)" },
  { code: "+40", label: "RO (+40)" },
  { code: "+90", label: "TR (+90)" },
];

const COUNTRY_MAX_LENGTHS: Record<string, number> = {
  "+1": 10, "+44": 10, "+971": 9, "+91": 10, "+61": 9, "+49": 11, "+33": 9,
  "+81": 10, "+86": 11, "+55": 11, "+27": 9, "+39": 10, "+34": 9, "+31": 9,
  "+41": 9, "+46": 9, "+47": 8, "+45": 8, "+358": 10, "+65": 8, "+60": 10,
  "+62": 11, "+66": 9, "+82": 10, "+966": 9, "+974": 8, "+965": 8, "+973": 8,
  "+968": 8, "+20": 10, "+212": 9, "+234": 10, "+254": 9, "+52": 10, "+54": 10,
  "+56": 9, "+57": 10, "+51": 9, "+92": 10, "+880": 10, "+94": 9, "+977": 10,
  "+353": 9, "+351": 9, "+30": 10, "+43": 10, "+32": 9, "+48": 9, "+420": 9,
  "+36": 9, "+40": 9, "+90": 10,
};

type FormData = z.infer<typeof schema>;

export function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: { countryCode: "+1" }
  });

  const selectedCountryCode = watch("countryCode");
  const currentMaxLength = COUNTRY_MAX_LENGTHS[selectedCountryCode || "+1"] || 15;
  const selectedCountryLabel = COUNTRY_CODES.find(c => c.code === (selectedCountryCode || "+1"))?.label || (selectedCountryCode || "+1");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRY_CODES.filter(c => 
    c.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  const onSubmit = async (data: FormData) => {
    setServerError("");
    
    const rawVal = data.phone ? data.phone.replace(/\D/g, "") : "";
    if (rawVal && rawVal.length < currentMaxLength) {
      setError("phone", { 
        type: "manual", 
        message: `Please enter exactly ${currentMaxLength} digits for ${selectedCountryLabel}` 
      });
      return;
    }

    try {
      const { countryCode, ...restData } = data;
      const submissionData = {
        ...restData,
        phone: data.phone ? `${countryCode || '+1'} ${data.phone}` : undefined,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
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
          <div className="flex gap-2">
            <div className="relative" ref={dropdownRef}>
              <input type="hidden" {...register("countryCode")} />
              <div 
                className="h-10 w-[110px] rounded-lg bg-navy-light/30 border border-steel/40 text-surface pl-3 pr-8 text-sm focus-within:border-gold/60 transition-colors flex items-center cursor-text relative"
                onClick={() => setIsDropdownOpen(true)}
              >
                <input 
                  type="text"
                  className="w-full bg-transparent outline-none cursor-text text-sm placeholder:text-surface/50"
                  value={isDropdownOpen ? searchQuery : selectedCountryCode || "+1"}
                  onChange={(e) => {
                     setSearchQuery(e.target.value);
                     setIsDropdownOpen(true);
                  }}
                  onFocus={() => {
                     setIsDropdownOpen(true);
                     setSearchQuery("");
                  }}
                  placeholder="Search..."
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-surface/50">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute z-50 top-full left-0 mt-1 w-[200px] max-h-[240px] overflow-y-auto bg-[#0A1224] border border-steel/40 rounded-lg shadow-xl py-1">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map(country => (
                      <div 
                        key={country.code} 
                        className="px-3 py-2 text-sm text-surface hover:bg-gold/20 cursor-pointer transition-colors"
                        onClick={() => {
                          setValue("countryCode", country.code);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        {country.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-surface/50 text-center">No results found</div>
                  )}
                </div>
              )}
            </div>
            <Input
              id="contact-phone"
              type="tel"
              {...register("phone", {
                onChange: (e) => {
                  const rawVal = e.target.value.replace(/\D/g, "");
                  let val = rawVal;
                  
                  if (rawVal.length > currentMaxLength) {
                    setError("phone", { 
                      type: "manual", 
                      message: `Maximum ${currentMaxLength} digits allowed for ${selectedCountryLabel}` 
                    });
                    val = rawVal.slice(0, currentMaxLength);
                  } else {
                    clearErrors("phone");
                  }
                  
                  e.target.value = val;
                },
                onBlur: (e) => {
                  const rawVal = e.target.value.replace(/\D/g, "");
                  if (rawVal.length > 0 && rawVal.length < currentMaxLength) {
                    setError("phone", { 
                      type: "manual", 
                      message: `Please enter exactly ${currentMaxLength} digits for ${selectedCountryLabel}` 
                    });
                  }
                }
              })}
              placeholder={`${currentMaxLength} digits`}
              className={cn(
                "flex-1 bg-navy-light/30 border-steel/40 text-surface placeholder:text-steel-muted focus:border-gold/60",
                errors.phone && "border-error/60"
              )}
            />
          </div>
          {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
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
