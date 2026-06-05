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
        <div className="fixed inset-0 z-[100] bg-[#0b1b33] flex flex-col font-sans selection:bg-gold selection:text-[#0b1b33] overflow-hidden">
            {/* Hero Section */}
            <main className="relative flex-1 flex flex-col items-center justify-center p-6 bg-transparent">
                {/* Background Subtle Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="relative z-10 max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 px-4 md:px-8">
                    
                    {/* Left Side: Text Content */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-2xl lg:pr-8">
                        {/* Message */}
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase leading-none">
                                Something <br className="hidden lg:block" /><span className="text-gold">Great</span> is Coming
                            </h2>
                            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
                                We are currently performing scheduled maintenance to enhance your experience.
                                Our team is working hard to bring you the next generation of industrial MRO supply solutions.
                            </p>
                        </div>

                        {/* Contact Shortcut */}
                        <div className="flex flex-col items-center lg:items-start gap-4 w-full">
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] w-8 bg-white/20 lg:hidden" />
                                <p className="text-white/60 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Direct Support</p>
                                <div className="h-[1px] w-16 bg-white/20 hidden lg:block" />
                                <div className="h-[1px] w-8 bg-white/20 lg:hidden" />
                            </div>
                            <a
                                href="mailto:info@vertacore.ae"
                                className="group relative px-8 py-3.5 bg-white text-[#0b1b33] rounded-xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden text-base inline-flex"
                            >
                                <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 group-hover:text-[#0b1b33]">info@vertacore.ae</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Image with Floating Emojis */}
                    <div className="flex-1 flex justify-center lg:justify-end w-full animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div className="relative w-full max-w-[280px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] aspect-square">
                            
                            {/* The Image */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 z-20 bg-white">
                                <img
                                    src="/maintenance.png"
                                    alt="Vertacore Under Maintenance"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Floating emojis around the image with Modern Neon Glow */}
                            <div className="absolute -top-10 -left-8 md:-top-16 md:-left-12 text-6xl md:text-[5rem] animate-float-2 z-30 pointer-events-none drop-shadow-[0_0_30px_rgba(0,255,255,0.9)]">
                                ⚙️
                            </div>
                            
                            {/* Moved the wrench to a new position with a pink neon glow */}
                            <div className="absolute top-1/3 -right-10 md:top-1/2 md:-right-16 text-5xl md:text-7xl animate-float-3 z-30 pointer-events-none drop-shadow-[0_0_30px_rgba(255,0,255,0.9)]" style={{ animationDelay: '1s' }}>
                                🛠️
                            </div>
                            
                            {/* Subtle Central Glow Behind Image */}
                            <div className="absolute inset-0 bg-gold/20 blur-[80px] lg:blur-[100px] rounded-full pointer-events-none z-10" />
                        </div>
                    </div>
                </div>
            </main>



            <style jsx global>{`
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-1 { animation: float 6s ease-in-out infinite; }
        .animate-float-2 { animation: float 8s ease-in-out infinite 1s; }
        .animate-float-3 { animation: float 7s ease-in-out infinite 2s; }
      `}</style>
        </div>
    );
}
