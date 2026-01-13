"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import CircularGallery from "./CircularGallery";

const Gallery = () => {
  gsap.registerPlugin(SplitText);

  const Title = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.set(Title.current, { clearProps: "all" });
    const split = SplitText.create(Title.current, {
      type: "words",
      mask: "words",
      autoSplit: true,
    });
    gsap.from(split.words, {
      duration: 6,
      stagger: 0.1,
      opacity: 0.2,
      ease: "power4.inOut",
      repeat: -1,
    });
  });

  return (
    <div
      id="Gallery"
      className="w-full min-h-screen flex flex-col justify-center items-center mt-130 Gallery "
    >
      <div ref={Title} className="flex justify-center items-center p-4">
        <p className="text-xl sm:text-lg md:text-2xl lg:text-2xl font-bold text-white m-2 p-2">
          Witness the art of celebration . Browse through our curated gallery of
          real events , showcasing our versatility and attention to detail
          across different styles and occasions .
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full h-[400px] lg:h-[500px]" style={{ width:"100%", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            scrollSpeed={1.8}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
