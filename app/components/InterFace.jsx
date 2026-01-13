import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

// تسجيل GSAP plugins مرة واحدة فقط
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const InterFace = () => {
  const NavRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const splitTextRef = useRef(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // التحقق من أننا في بيئة المتصفح
    if (typeof window === "undefined") return;

    const split = SplitText.create(titleRef.current, {
      type: "words",
      autoSplit: true,
      wordsClass: "word",
    });

    const ctx = gsap.context(() => {
      // إنشاء التسلسل الزمني الرئيسي
      const masterTL = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.1,
        },
      });

      // 1. تحريك شريط التنقل
      masterTL.from(NavRef.current, {
        opacity: -2,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // 2. تحريك الشعار
      masterTL.from(logoRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.Out",
      });

      //3. split text
      masterTL.from(split.words, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "circ.out", // سلس جداً
        onStart: () => {
          // إضافة glow خفيف
          gsap.to(titleRef.current, {
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
          });
        },
      },"-=0.01");

      // 4. تحريك نص التمرير مع تأثير متكرر
      masterTL.from(
        scrollRef.current,
        {
          y: 30,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => {
            // تأثير التموج المتكرر
            gsap.to(scrollRef.current, {
              y: 10,
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        },
        "-=0.2"
      );

      // 5. تأثيرات إضافية عند التمرير
      if (ScrollTrigger && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          onEnter: () => {
            gsap.to(NavRef.current, {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });

        // تأثير parallax بسيط للشعار
        ScrollTrigger.create({
          trigger: logoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(logoRef.current, {
              y: self.progress * 50,
              scale: 1 - self.progress * 0.1,
              duration: 0.1,
            });
          },
        });
      }

      // 6. تأثيرات hover تفاعلية للروابط
      const links = NavRef.current?.querySelectorAll("a");
      if (links) {
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, {
              scale: 1.2,
              duration: 0.1,
              ease: "power2.in",
            });
          });

          link.addEventListener("mouseleave", () => {
            gsap.to(link, {
              scale: 1,
              duration: 0.1,
              ease: "power2.out",
            });
          });
        });
      }
    }, containerRef); // ربط context بـ containerRef

    // تنظيف event listeners عند إلغاء التثبيت
    return () => {
      ctx.revert();
      // تنظيف SplitText instance
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, []);

  useEffect( ()=> {
    const newNav = document.getElementById("main-nav");
    const handleScroll = () => {
      if (window.scrollY >= 1480) {
    newNav.className = "div1 font-extrabold fixed top-4 xs:top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-99999 w-[95%] xs:w-[90%] sm:w-auto flex flex-wrap justify-center items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4 bg-gray-600 border border-white/30 rounded-full transition-all duration-300";
  } else {
    newNav.className = "div1 font-extrabold fixed top-4 xs:top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-99999 w-[95%] xs:w-[90%] sm:w-auto flex flex-wrap justify-center items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4  bg-white/30 backdrop-blur-sm border border-white/30 rounded-full shadow-lg transition-all duration-300"
  }
    };
  
    handleScroll(); // تحقق من الحالة الأولية
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [] )
  

  return (
    <>
      <div
        ref={containerRef}
        className="Main z-50 relative w-full h-full min-h-screen"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.7)" }}
          >
            <source src="/red-silk.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Navigation Bar */}
        <div
          id="main-nav"
          ref={NavRef}
          className="div1 font-extrabold fixed top-4 xs:top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-99999 w-[95%] xs:w-[90%] sm:w-auto flex flex-wrap justify-center items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4  bg-white/30 backdrop-blur-sm border border-white/30 rounded-full shadow-lg transition-all duration-300"
        >
          <a
            className=" hover:text-white hover:scale-105 text-xs xs:text-sm sm:text-base px-2 xs:px-3 sm:px-4 py-1 sm:py-2 font-medium transition-all duration-300 whitespace-nowrap"
            href="#services"
          >
            Services
          </a>
          <a
            className="text-gray-700 hover:text-white hover:scale-105 text-xs xs:text-sm sm:text-base px-2 xs:px-3 sm:px-4 py-1 sm:py-2 font-medium transition-all duration-300 whitespace-nowrap"
            href="#Gallery"
          >
            Gallery
          </a>
          <a
            className="text-gray-700 hover:text-white hover:scale-105 text-xs xs:text-sm sm:text-base px-2 xs:px-3 sm:px-4 py-1 sm:py-2 font-medium transition-all duration-300 whitespace-nowrap"
            href="/Contact"
          >
            Contact
          </a>
          <a
            className="text-gray-700 hover:text-white hover:scale-105 text-xs xs:text-sm sm:text-base px-2 xs:px-3 sm:px-4 py-1 sm:py-2 font-medium transition-all duration-300 whitespace-nowrap"
            href="#About"
          >
            About Us
          </a>
        </div>

        {/* Logo Section - Right Side */}
        <div ref={logoRef} className="div2 flex justify-center items-center">
          <Image
            
            src="/DME Logo.png"
            width={500}
            height={600}
            alt="logo"
            className=" z-20 mb-8 p-0 relative rounded-full w-48 h-48 xs:w-80 xs:h-100 sm:w-90 sm:h-150 md:w-100 md:h-100 lg:w-120 lg:h-150 xl:w-150 xl:h-230 "
            priority
          />
        </div>
          

        {/* Main Title - Left Side */}
        <div className="div3 flex justify-center items-center lg:items-start lg:absolute top-0 lg:top-1/2 left-0 sm:left-4 md:left-8 lg:left-12 xl:left-20 lg:transform lg:-translate-y-1/2 order-1 lg:order-2 mt-6 lg:mt-0 px-4 xs:px-6">
          <div ref={titleRef} className="text-center lg:text-left max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg">
            <h1
              className="text-white flex flex-row gap-2 z-20 text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight drop-shadow-lg"
              style={{ opacity: 1, visibility: "visible" }}
            >
             Creating unforgettable moments
            </h1>
            <p 
              className="text-white z-20 text-md xs:text-xl sm:text-md md:text-md lg:text-lg xl:text-xl leading-tight drop-shadow-lg"
              style={{ opacity: 1, visibility: "visible" }}
            >
              The best place for party planning & Decor
            </p>
            <div className="mt-3 xs:mt-4 sm:mt-6 w-32 xs:w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 h-1 bg-linear-to-r from-white/50 to-white rounded-full mx-auto lg:mx-0"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="div4 flex justify-center items-center absolute bottom-4 xs:bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2">
          <div
            className="text-center group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const aboutElement = document.getElementById("About");
              if (aboutElement) {
                aboutElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <h1
              ref={scrollRef}
              className="text-white/80 z-30 mb-4 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light transition-all duration-300"
            >
              start ↧
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterFace;
