"use client";

import { cn } from "@/lib/utils";

const brands = [
    "techweld", "geotex", "weldman", "electro-heat", "gasiq",
    "superon", "tempindic", "victor", "sincosald", "sakura",
    "orkon", "supraflex", "toyo", "toyolift", "liftek",
    "rigman", "tencate", "orris-safety"
];

export function MaintenancePage() {
    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col font-sans selection:bg-gold selection:text-white overflow-y-auto">
            {/* Hero Section */}
            <main className="relative flex-1 flex flex-col items-center justify-center p-6 bg-[#f8fafc]">
                {/* Background Subtle Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#0b1b33 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
                    {/* Featured Image */}
                    <div className="relative w-full max-w-2xl aspect-square rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 animate-in fade-in zoom-in duration-1000">
                        <img
                            src="/maintenance.png"
                            alt="Vertacore Under Maintenance"
                            className="w-full h-full object-contain bg-white"
                        />
                    </div>

                    {/* Message */}
                    <div className="mt-12 text-center space-y-4 max-w-2xl px-6">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0b1b33] tracking-tight uppercase">
                            Something <span className="text-gold">Great</span> is Coming
                        </h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            We are currently performing scheduled maintenance to enhance your experience.
                            Our team is working hard to bring you the next generation of industrial MRO supply solutions.
                        </p>
                    </div>

                    {/* Contact Shortcut */}
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-slate-200" />
                            <p className="text-[#0b1b33]/60 font-bold uppercase tracking-[0.2em] text-[10px]">Direct Support</p>
                            <div className="h-[1px] w-8 bg-slate-200" />
                        </div>
                        <a
                            href="mailto:info@vertacore.ae"
                            className="group relative px-8 py-3 bg-[#0b1b33] text-white rounded-xl font-bold transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 group-hover:text-[#0b1b33]">info@vertacore.ae</span>
                        </a>
                    </div>
                </div>
            </main>

            <div className="py-12 bg-[#f8fafc]" />

            <style jsx global>{`
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    );
}
