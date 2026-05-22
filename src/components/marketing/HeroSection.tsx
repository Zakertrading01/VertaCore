"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const slides = [
  {
    id: 1,
    type: "video",
    // Reliable industrial welding video
    src: "https://upload.wikimedia.org/wikipedia/commons/e/eb/The_sound_of_welding.webm",
    alt: "Industrial Welding Video",
  },
  {
    id: 2,
    type: "image",
    src: "/images/hero-bg.png",
    alt: "Industrial Facility at Sunset",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center bg-black overflow-hidden group"
      aria-label="Hero"
    >
      {/* Slider Backgrounds */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {slide.type === "image" ? (
            <Image
              src={slide.src}
              alt={slide.alt!}
              fill
              priority={index === 0}
              className={`object-cover object-center scale-105 ${
                index === currentSlide ? "animate-pulse-slow" : ""
              }`}
              style={{ animationDuration: "20s" }}
            />
          ) : (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Neutral Overlay for Readability (No blue tint) */}
          <div className="absolute inset-0 bg-black/20 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Slider Controls (Arrows) */}
      <div className="absolute bottom-8 right-4 md:right-8 flex items-center gap-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container-base w-full pt-28 pb-16 flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-3xl relative mt-16">
          
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg hover:bg-white/10 transition-colors">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span className="text-[10px] font-bold text-white tracking-[0.15em] uppercase">
                ISO 9001:2015 Certified
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl uppercase select-none flex flex-wrap">
              <span className="flex text-white mr-3">
                {"PREMIUM".split("").map((char, i) => (
                  <span key={`p-${i}`} className="inline-block hover:scale-125 hover:-translate-y-2 hover:text-gold active:scale-90 transition-all duration-200 cursor-pointer">
                    {char}
                  </span>
                ))}
              </span>
              <span className="hidden md:block w-full h-0"></span>
              <span className="flex text-gold">
                {"INDUSTRIAL SOLUTIONS".split("").map((char, i) => (
                  <span key={`is-${i}`} className={`inline-block hover:scale-125 hover:-translate-y-2 hover:text-white active:scale-90 transition-all duration-200 cursor-pointer ${char === ' ' ? 'w-3 md:w-5' : ''}`}>
                    {char}
                  </span>
                ))}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed mb-8 font-light tracking-wide cursor-pointer hover:text-white active:scale-[0.98] transition-all duration-200 select-none">
              A one-stop supply shop for top-rate products serving the welding, lifting, safety, and heavy manufacturing industries worldwide.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-10">
              <Link
                href="/catalogue"
                className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 bg-gold text-navy-dark font-bold px-6 py-3 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(231,200,90,0.4)] transition-all duration-300 text-sm md:text-base overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <BookOpen className="h-4 w-4 relative z-10" />
                <span className="relative z-10">View Catalogue</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Trust Indicators */}
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-6 border-t border-white/10">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "500+", label: "Products Supplied" },
                { value: "10+", label: "Industries Served" },
                { value: "100%", label: "Certified Quality" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xl md:text-2xl font-black text-white drop-shadow-md">{stat.value}</div>
                  <div className="text-[9px] md:text-[10px] text-white/60 uppercase tracking-wider font-bold max-w-[70px] leading-tight">
                    {stat.label}
                  </div>
                  {i !== 3 && <div className="hidden md:block h-6 w-px bg-white/10 ml-3" />}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-2 bg-gold"
                : "w-2 h-2 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
