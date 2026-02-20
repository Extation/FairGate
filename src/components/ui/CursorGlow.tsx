"use client";

import { FC, useEffect, useState, useRef, useCallback } from "react";

interface InteractiveParticle {
  id: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  floatOffsetX: number;
  floatOffsetY: number;
  floatSpeedX: number;
  floatSpeedY: number;
  floatPhase: number;
}

export const CursorGlow: FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  const glowColor = isDark
    ? "rgba(12, 147, 233, 0.08)"
    : "rgba(12, 147, 233, 0.15)";
  const glowSize = isDark ? 600 : 500;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
      }}
    />
  );
};

export const BackgroundEffects: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const particlesRef = useRef<InteractiveParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particleElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize particles
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Generate particles with random positions
    const particles: InteractiveParticle[] = Array.from({ length: 50 }).map((_, i) => {
      const baseX = Math.random() * window.innerWidth;
      const baseY = Math.random() * window.innerHeight;
      return {
        id: i,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        vx: 0,
        vy: 0,
        size: Math.random() > 0.5 ? 4 : 3,
        floatOffsetX: 0,
        floatOffsetY: 0,
        floatSpeedX: 0.0005 + Math.random() * 0.001,
        floatSpeedY: 0.0003 + Math.random() * 0.0008,
        floatPhase: Math.random() * Math.PI * 2,
      };
    });
    particlesRef.current = particles;
    setMounted(true);

    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const time = Date.now();

    const REPULSION_RADIUS = 150;
    const REPULSION_STRENGTH = 8;
    const FRICTION = 0.92;
    const RETURN_SPEED = 0.03;
    const FLOAT_AMPLITUDE_X = 30;
    const FLOAT_AMPLITUDE_Y = 20;

    particles.forEach((particle, index) => {
      // Calculate floating offset (gentle drift)
      particle.floatOffsetX = Math.sin(time * particle.floatSpeedX + particle.floatPhase) * FLOAT_AMPLITUDE_X;
      particle.floatOffsetY = Math.cos(time * particle.floatSpeedY + particle.floatPhase) * FLOAT_AMPLITUDE_Y;

      // Target position (base + float)
      const targetX = particle.baseX + particle.floatOffsetX;
      const targetY = particle.baseY + particle.floatOffsetY;

      // Calculate distance from mouse
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply repulsion if mouse is close
      if (distance < REPULSION_RADIUS && distance > 0) {
        const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle) * force * REPULSION_STRENGTH;
        particle.vy += Math.sin(angle) * force * REPULSION_STRENGTH;
      }

      // Apply friction
      particle.vx *= FRICTION;
      particle.vy *= FRICTION;

      // Spring back to target position
      particle.vx += (targetX - particle.x) * RETURN_SPEED;
      particle.vy += (targetY - particle.y) * RETURN_SPEED;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update DOM element directly for performance
      const element = particleElementsRef.current[index];
      if (element) {
        element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation loop
  useEffect(() => {
    if (mounted) {
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [mounted, animate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      particlesRef.current.forEach((particle) => {
        // Redistribute particles on resize
        particle.baseX = Math.random() * window.innerWidth;
        particle.baseY = Math.random() * window.innerHeight;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define orb colors based on theme
  const orbs = isDark
    ? [
        { top: "-10%", left: "-5%", size: 500, color: "rgba(12, 147, 233, 0.15)", blur: 80, anim: "animate-orb-1" },
        { top: "25%", right: "-5%", size: 400, color: "rgba(168, 85, 247, 0.12)", blur: 70, anim: "animate-orb-2" },
        { bottom: "-5%", left: "25%", size: 450, color: "rgba(6, 182, 212, 0.10)", blur: 90, anim: "animate-orb-3" },
      ]
    : [
        { top: "-5%", left: "-3%", size: 550, color: "rgba(12, 147, 233, 0.25)", blur: 60, anim: "animate-orb-1" },
        { top: "20%", right: "-3%", size: 450, color: "rgba(168, 85, 247, 0.20)", blur: 55, anim: "animate-orb-2" },
        { bottom: "-3%", left: "20%", size: 500, color: "rgba(6, 182, 212, 0.18)", blur: 65, anim: "animate-orb-3" },
        { top: "60%", right: "20%", size: 400, color: "rgba(236, 72, 153, 0.15)", blur: 55, anim: "animate-orb-4" },
        { top: "40%", left: "40%", size: 600, color: "rgba(59, 130, 246, 0.12)", blur: 80, anim: "animate-orb-5" },
      ];

  // Particle colors based on theme
  const particleColor = isDark ? "rgba(56, 189, 248, 0.7)" : "rgba(59, 130, 246, 0.85)";
  const particleSizeMultiplier = isDark ? 1.5 : 2;

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.15 : 0.4,
          background: isDark
            ? `radial-gradient(ellipse at 20% 50%, rgba(12, 147, 233, 0.1) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 20% 50%, rgba(12, 147, 233, 0.2) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
               radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
               radial-gradient(ellipse at 70% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.03]" />

      {/* Animated gradient orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={orb.anim}
          style={{
            position: "absolute",
            top: orb.top || "auto",
            left: orb.left || "auto",
            right: (orb as any).right || "auto",
            bottom: (orb as any).bottom || "auto",
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Interactive floating particles */}
      {mounted && (
        <div className="absolute inset-0">
          {particlesRef.current.map((particle, index) => {
            const size = particle.size * particleSizeMultiplier;
            return (
              <div
                key={particle.id}
                ref={(el) => { particleElementsRef.current[index] = el; }}
                className="absolute rounded-full will-change-transform"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: particleColor,
                  transform: `translate(${particle.x}px, ${particle.y}px)`,
                  left: 0,
                  top: 0,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Light rays effect - light mode only */}
      {!isDark && (
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            background: `linear-gradient(135deg, transparent 0%, rgba(12, 147, 233, 0.1) 25%, transparent 50%),
                         linear-gradient(225deg, transparent 0%, rgba(168, 85, 247, 0.08) 25%, transparent 50%),
                         linear-gradient(315deg, transparent 0%, rgba(6, 182, 212, 0.06) 25%, transparent 50%)`,
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};
