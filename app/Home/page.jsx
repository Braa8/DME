"use client";
import React, { useRef } from "react";
import InterFace from "../components/InterFace";
import AboutSection from "../components/AboutSection";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import Services from "../components/Services";
import Gallery from "../components/Gallery";

// تسجيل GSAP plugins مرة واحدة فقط
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    console.warn("GSAP plugin registration failed:", error);
  }
}

const Homepage = () => {
  const interFaceRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.create({
      trigger: aboutSectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleClass: {
        targets: aboutSectionRef.current,
        className: "active-section"
      },
      markers: false,
    });


  }, []);

  return (
    <div className="relative w-full">
      <div 
        ref={interFaceRef}
        className="top-0 left-0 w-full h-screen relative"
      >
        <InterFace />
      </div>

      <div 
        id="About"
        ref={aboutSectionRef}
        className="w-full About"
      >
        <AboutSection />
      </div>

      <div 
      id="services"
      className="w-full"
      >
        <Services />
      </div>

      <div 
      id="gallery"
      className="w-full "
      >
        <Gallery />
      </div>

    </div>
  );
};

export default Homepage;