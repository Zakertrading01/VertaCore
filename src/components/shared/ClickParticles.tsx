"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface ClickParticlesProps {
  children: React.ReactNode;
  className?: string;
}

export function ClickParticles({ children, className = "" }: ClickParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdCounter = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create 12 particles per click
    const newParticles: Particle[] = Array.from({ length: 12 }).map(() => ({
      id: particleIdCounter.current++,
      x,
      y,
      color: Math.random() > 0.5 ? "#FFD700" : "#FFFFFF", // Mix of gold and white
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean them up after animation completes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 1000);
  };

  return (
    <div 
      ref={containerRef} 
      onPointerDown={handlePointerDown} 
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {children}
      <AnimatePresence>
        {particles.map((p) => {
          const angle = Math.random() * Math.PI * 2;
          const velocity = 50 + Math.random() * 80;
          const tx = Math.cos(angle) * velocity;
          const ty = Math.sin(angle) * velocity;
          const size = 3 + Math.random() * 4;

          return (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
              animate={{ 
                x: p.x + tx, 
                y: p.y + ty, 
                scale: 0, 
                opacity: 0 
              }}
              transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none z-50"
              style={{ 
                backgroundColor: p.color, 
                width: size, 
                height: size, 
                left: -size / 2, 
                top: -size / 2,
                boxShadow: p.color === "#FFD700" ? "0 0 10px 2px rgba(255,215,0,0.6)" : "0 0 8px 2px rgba(255,255,255,0.6)"
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
