"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Intro() {
  const router = useRouter();

  const imageRef = useRef(null);

  const textRef = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const image = imageRef.current;
    const text = textRef.current;
    if (!image || !text) return;

    // Get viewport height
    const vh = window.innerHeight;

    // Initial setup
    gsap.set(image, { willChange: "transform" });
    gsap.set(text, {
      opacity: 0,
      y: 0,
      fontFamily: "var(--font-playfair-display)",
      pointerEvents: "none", // Prevent text from blocking interactions
    });

    // Disable scroll during animation
    gsap.set("html, body", { overflow: "hidden" });

    // Animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set("html, body", { overflow: "auto" });
      },
    });

    // First movement: down to y
    tl.to(image, {
      y: 0,
      duration: 4,
      ease: "power2.inOut",
      onStart: () => {
        // Fade in text with a slight delay
        gsap.to(text, {
          opacity: 1,
          y: -10,
          duration: 1,
          delay: 1,
          ease: "power2.out",
          onComplete: () => {
            // Keep text visible after animation
            gsap.set(text, { clearProps: "y" });
          },
        });
      },
    })
      // Second movement: up to
      .to(image, {
        y: -vh * 2,
        duration: 3,
        ease: "power2.inOut",
        onStart: () => {
          // Optional: Add some effect to text when moving up
          gsap.to(text, {
            scale: 1.05,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        },
      })
      // Pause briefly
      .to({}, { duration: 1 })
      // Then zoom in with fade out
      .to(image, {
        scale: 3, // Increased scale
        opacity: 0, // Fade out at the end
        duration: 2.5, // Slightly longer duration
        ease: "power3.in", // More dramatic ease
        onStart: () => {
          // Fade out text during zoom
          gsap.to(text, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onComplete: () => {
          // Reset scale for potential future animations
          gsap.set(image, { scale: 1, opacity: 0 });
          gsap.set("html, body", { overflow: "hidden" });
        },
      });

    // Handle window resize
    const onResize = () => {
      const newVh = window.innerHeight;
      gsap.set(image, { y: 0 });
      tl.invalidate();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf([image, text]);
    };
  }, []);

  return (
    <div ref={imageRef} className="relative w-full h-full full-screen-image">
      <h1
        ref={textRef}
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 font-bold text-gray-900 text-center text-8xl mt-8"
      >
        Your Vision , Our Mission
      </h1>
    </div>
  );
}
