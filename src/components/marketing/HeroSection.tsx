"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ShieldCheck, ChevronLeft, ChevronRight, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const slides = [
  {
    id: 1,
    type: "video",
    // Reliable industrial welding video
    src: "https://upload.wikimedia.org/wikipedia/commons/e/eb/The_sound_of_welding.webm",
    alt: "Industrial Welding Video",
    title1: "Engineering Reliability.",
    title2: "Delivering Confidence.",
    description: "Industrial Solutions Built for Critical Projects.",
    fontClass: "font-montserrat font-black tracking-tighter",
    animationClass: "animate-reveal-letter",
  },
  {
    id: 2,
    type: "image",
    src: "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/images/hero-bg.png",
    alt: "Industrial Facility at Sunset",
    title1: "Next-Gen",
    title2: "Welding Armor.",
    description: "State-of-the-art protective wear designed to conquer extreme thermal environments.",
    fontClass: "font-montserrat font-black tracking-tighter",
    animationClass: "animate-drop-in-letter",
  },
  {
    id: 3,
    type: "video",
    src: "/videos/14378496_3840_2160_24fps.mp4",
    alt: "Video Slide 3",
    title1: "Secure Every",
    title2: "Heavy Lift.",
    description: "Premium rigging and lifting equipment engineered for absolute operational control.",
    fontClass: "font-montserrat font-black tracking-tighter",
    animationClass: "animate-zoom-in-letter",
  },
  {
    id: 4,
    type: "image",
    src: "/images/hero-slide-4.jpeg",
    alt: "Premium Quality Feature",
    title1: "Commitment To",
    title2: "Absolute Safety.",
    description: "Protecting your workforce with premium Vertacore safety solutions.",
    fontClass: "font-montserrat font-black tracking-tighter",
    animationClass: "animate-flip-in-letter",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0, 1]));

  useEffect(() => {
    setLoadedSlides((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentSlide);
      newSet.add((currentSlide + 1) % slides.length);
      return newSet;
    });
  }, [currentSlide]);

  useEffect(() => {
    slides.forEach((slide, index) => {
      if (slide.type === "video") {
        const video = videoRefs.current[index];
        if (video) {
          if (index === currentSlide) {
            video.currentTime = 0;
            video.play().catch((e) => console.log("Video play failed:", e));
          } else {
            video.pause();
          }
        }
      }
    });
  }, [currentSlide]);

  // Auto-play slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section
      id="hero"
      className="relative h-[100dvh] lg:h-screen flex flex-col lg:flex-row items-stretch bg-black overflow-hidden group"
      aria-label="Hero"
    >
      {/* ── Media Container (Top on Mobile, Full on Desktop) ── */}
      <div className="relative h-[42vh] lg:h-auto lg:absolute lg:inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt={slide.alt!}
                fill
                priority={index === 0}
                quality={100}
                className={`object-cover object-center ${index === currentSlide ? "animate-pulse-slow" : ""}`}
                style={{ animationDuration: "20s" }}
              />
            ) : (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={loadedSlides.has(index) ? slide.src : undefined}
                preload={index === currentSlide || index === (currentSlide + 1) % slides.length ? "auto" : "none"}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Desktop-only Gradient Overlay */}
            <div className="hidden lg:block absolute inset-0 bg-black/20 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Mobile-only subtle dark overlay to help social icons pop if needed */}
            <div className="lg:hidden absolute inset-0 bg-black/10" />
          </div>
        ))}

      </div>

      {/* ── Content Container (Bottom on Mobile, Centered on Desktop) ── */}
      <div className="relative z-10 w-full flex-1 lg:flex-none flex flex-col justify-center bg-navy-dark lg:bg-transparent py-4 md:py-8 lg:py-0 lg:min-h-screen">
        <div className="container-base">
          <div className="max-w-3xl pt-2 lg:pt-28">



            <ScrollReveal delay={0.2} key={`title-${currentSlide}`}>
              <h1 className={`text-3xl md:text-5xl lg:text-[60px] leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl select-none flex flex-wrap transition-colors duration-500 ${slides[currentSlide].fontClass || ''}`}>
                <span className="flex flex-wrap text-surface mr-3">
                  {slides[currentSlide].title1.split("").map((char, i) => (
                    <span 
                      key={`er-${currentSlide}-${i}`} 
                      className={`inline-block hover:scale-125 hover:-translate-y-2 hover:text-gold active:scale-90 duration-200 cursor-pointer ${char === ' ' ? 'w-2 md:w-4' : ''} ${slides[currentSlide].animationClass}`}
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="block w-full h-0"></span>
                <span className="flex flex-wrap text-gold mt-1 lg:mt-2">
                  {slides[currentSlide].title2.split("").map((char, i) => (
                    <span 
                      key={`dc-${currentSlide}-${i}`} 
                      className={`inline-block hover:scale-125 hover:-translate-y-2 hover:text-white active:scale-90 duration-200 cursor-pointer ${char === ' ' ? 'w-2 md:w-4' : ''} ${slides[currentSlide].animationClass}`}
                      style={{ animationDelay: `${(slides[currentSlide].title1.length + i) * 0.04}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3} key={`desc-${currentSlide}`}>
              <p className="text-sm md:text-lg text-white/70 lg:text-white/90 max-w-xl leading-relaxed mb-6 md:mb-8 font-light tracking-wide cursor-pointer hover:text-white active:scale-[0.98] transition-all duration-200 select-none">
                {slides[currentSlide].description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-6 md:mb-10">
                <Link
                  href="/catalogue"
                  className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 bg-gold text-navy-dark font-bold px-8 py-3.5 md:px-6 md:py-3 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(231,200,90,0.4)] transition-all duration-300 text-sm md:text-base overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                  <BookOpen className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">View Catalogue</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust Indicators */}
            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 md:pt-8 border-t border-white/10 lg:border-none">
                {[
                  { value: "30+", label: "Years Experience" },
                  { value: "1500+", label: "Products Supplied" },
                  { value: "10+", label: "Industries Served" },
                  { value: "100%", label: "Premium Quality" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xl md:text-2xl font-black text-white drop-shadow-md">{stat.value}</div>
                    <div className="text-[9px] md:text-[10px] text-white/50 lg:text-white/60 uppercase tracking-wider font-bold max-w-[70px] leading-tight">
                      {stat.label}
                    </div>
                    {i !== 3 && <div className="hidden md:block h-6 w-px bg-white/10 ml-3" />}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Slider Indicators (Dots) — Hidden on mobile as we have arrows and a split layout */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
              ? "w-8 h-2 bg-gold"
              : "w-2 h-2 bg-white/40 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Social Icons (Over the media on Mobile & Desktop) */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 md:gap-5 scale-90 md:scale-100 pointer-events-auto">
        {[
          { icon: Facebook, href: "https://facebook.com", color: "#1877F2", label: "Facebook" },
          { icon: Linkedin, href: "https://linkedin.com", color: "#0A66C2", label: "LinkedIn" },
          { icon: Youtube, href: "https://youtube.com", color: "#FF0000", label: "YouTube" },
          { icon: Instagram, href: "https://instagram.com", color: "#E4405F", label: "Instagram" },
        ].map((social, i) => {
          const Icon = social.icon;
          return (
            <ScrollReveal
              key={social.label}
              delay={0.6 + (i * 0.1)}
              direction="right"
              distance={20}
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-125 hover:bg-gold transition-all duration-300 group/social"
                aria-label={social.label}
                style={{ color: social.color }}
              >
                <Icon className="h-4.5 w-4.5 md:h-5 md:w-5 transition-colors group-hover/social:!text-navy-dark" />
              </a>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Slider Controls (Arrows) — Bottom Right on Mobile/Desktop */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-3 md:gap-4 z-30 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer">
        <button
          onClick={(e) => { prevSlide(); e.currentTarget.blur(); }}
          className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 outline-none focus:outline-none cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={(e) => { nextSlide(); e.currentTarget.blur(); }}
          className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 outline-none focus:outline-none cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </section>
  );
}
