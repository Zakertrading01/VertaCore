"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    company: z.string().min(2, "Please enter your company name"),
});

type FormData = z.infer<typeof schema>;

interface CatalogueRequestFormProps {
    onSuccess?: () => void;
}

export function CatalogueRequestForm({ onSuccess }: CatalogueRequestFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/catalogue/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to submit request");

            setIsSuccess(true);
            if (onSuccess) {
                setTimeout(onSuccess, 3000);
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                    <CheckCircle className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-surface mb-2">Request Received</h3>
                <p className="text-white max-w-xs mx-auto">
                    Thank you! We have received your request. You will receive the catalogue in your email within 24 business hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gold ml-1">
                    Full Name
                </label>
                <input
                    {...register("name")}
                    className={cn(
                        "w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-surface placeholder:text-surface/20 focus:outline-none focus:border-gold/50 transition-colors",
                        errors.name && "border-error/50"
                    )}
                    placeholder="John Doe"
                />
                {errors.name && (
                    <p className="text-[10px] text-error font-medium ml-1">{errors.name.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-gold ml-1">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        className={cn(
                            "w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-surface placeholder:text-surface/20 focus:outline-none focus:border-gold/50 transition-colors",
                            errors.email && "border-error/50"
                        )}
                        placeholder="john@company.com"
                    />
                    {errors.email && (
                        <p className="text-[10px] text-error font-medium ml-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-gold ml-1">
                        Phone Number
                    </label>
                    <input
                        {...register("phone")}
                        className={cn(
                            "w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-surface placeholder:text-surface/20 focus:outline-none focus:border-gold/50 transition-colors",
                            errors.phone && "border-error/50"
                        )}
                        placeholder="+971 -- --- ----"
                    />
                    {errors.phone && (
                        <p className="text-[10px] text-error font-medium ml-1">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gold ml-1">
                    Company Name
                </label>
                <input
                    {...register("company")}
                    className={cn(
                        "w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-surface placeholder:text-surface/20 focus:outline-none focus:border-gold/50 transition-colors",
                        errors.company && "border-error/50"
                    )}
                    placeholder="Industrial Enterprise Ltd."
                />
                {errors.company && (
                    <p className="text-[10px] text-error font-medium ml-1">{errors.company.message}</p>
                )}
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-xs font-medium">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group bg-gold text-navy font-bold py-4 rounded-xl overflow-hidden shadow-lg hover:shadow-gold/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Submit Request
                        </>
                    )}
                </span>
            </button>

            <p className="text-center text-[10px] text-white/50">
                By submitting, you agree to receive technical industrial documentation at the provided email.
            </p>
        </form>
    );
}
