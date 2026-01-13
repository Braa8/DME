"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// تعطيل GSAP DevTools في الإنتاج
if (process.env.NODE_ENV === "production") {
  gsap.config({ nullTargetWarn: false });
}

export default function Intro() {
  const router = useRouter();
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const animationRef = useRef(null);

  // دالة لإعادة تعيين الأنماط الأولية
  const resetStyles = useCallback(() => {
    if (imageRef.current && textRef.current) {
      gsap.set(imageRef.current, {
        willChange: "transform",
        clearProps: "all",
      });
      gsap.set(textRef.current, {
        opacity: 0,
        scale: 1,
        pointerEvents: "none",
        clearProps: "all",
      });
    }
  }, []);

  // دالة لتنظيف الرسوم المتحركة
  const cleanupAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
    gsap.killTweensOf([imageRef.current, textRef.current]);
  }, []);

  useGSAP(() => {
    if (
      typeof window === "undefined" ||
      !imageRef.current ||
      !textRef.current
    ) {
      return;
    }

    const image = imageRef.current;
    const text = textRef.current;
    const vh = window.innerHeight;

    resetStyles();
    gsap.set("body", { overflow: "hidden" });

    // إعداد النص الثابت - يبدأ غير مرئي
    gsap.set(text, {
      opacity: 0,
      x: "0",
      y: "-1100",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set("body", { overflow: "auto" });
        setTimeout(() => {
          router.push("/Home");
        }, 300);
      },
    });

    animationRef.current = tl;

    // المرحلة 1: تحريك الصورة للأسفل + ظهور النص تدريجياً
    tl.to(image, {
      y: 0,
      duration: 3,
      ease: "power2.inOut",
      onStart: () => {
        // ظهور النص مع حركة الصورة
        gsap.to(text, {
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          stagger: 4,
        });
      },
    })

      // المرحلة 2: تحريك الصورة لأعلى (النص يبقى كما هو)
      .to(image, {
        y: -vh * 2.3,
        duration: 3,
        ease: "power2.inOut",
        delay: 0.5,
        onStart: () => {
          // تأثير بسيط للنص دون تغيير موقعه
          gsap.to(text, {
            scale: 1.1,
            duration: 0.8,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        },
      })

      // المرحلة 3: تكبير وتلاشي الصورة مع تلاشي النص
      .to(image, {
        scale: 4,
        opacity: 0,
        duration: 2,
        ease: "power3.in",
        onStart: () => {
          // تلاشي النص مع الصورة
          gsap.to(text, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.inOut",
          });
        },
      });

    // Handle window resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) {
          animationRef.current.invalidate();
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      cleanupAnimation();
      gsap.set("body", { overflow: "auto" });
    };
  }, [router, resetStyles, cleanupAnimation]);

  const skipAnimation = useCallback(() => {
    cleanupAnimation();
    gsap.set("body", { overflow: "auto" });
    router.push("/Home");
  }, [router, cleanupAnimation]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black full-screen-image">
      <button
        onClick={skipAnimation}
        className="absolute top-4 right-4 z-50 px-4 py-2 text-sm text-white bg-gray-800 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Skip animation"
      >
        Skip
      </button>
      {/* النص الثابت في المركز */}
      <h1
        ref={textRef}
        className="absolute mt-28 flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center text-gray-900 pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair-display)",
        }}
      >
        <span className="block text-6xl md:text-8xl font-bold tracking-tight">
          Your Vision 
        </span>
        <span className="block text-6xl md:text-8xl font-bold tracking-tight">
          Our Mission
        </span>
      </h1>

       <div className="absolute inset-0 bg-white/20 z-10" />

      <video
        ref={imageRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover video-background"
        style={{
          transform: "translateY(100vh)",
        }}
      >
        <source src="/intro.mp4"  />
      </video>
    </div>
  );
}
