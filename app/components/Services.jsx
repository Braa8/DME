"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function Services() {
  const stackRef = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray(".panel");
    gsap.to(panels, {
      xPercent: (i) => -100 * i,
      duration: (i) => i,
      ease: "none",
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=" + 100 * panels.length + "5",
        scrub: true,
        pin: true,
      },
    });
  });

  return (
    <>
      <div className="section mb-4"></div>
      <div className="section wrapper">
        <div className="content">
          <div className="panel flex flex-col justify-center items-center MP ">
            <h1 className="text-gray-950 text-4xl font-extrabold md:text-6xl -mt-40">Comprehensive Event Services</h1>
            <div className="w-20 my-4 sm:w-24 md:w-32 h-1 bg-linear-to-r from-[#F9F1E5] to-[white] mx-auto rounded-full"></div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 mt-2 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12">
              <h2 className="text-gray-900 text-xl"> We offer a suite of tailored services to match your needs , from full-scale planning to exquisite decor styling .
                <br/> Explore how we bring your celebration to life .</h2>
            </div>
          </div>
          <div className="panel flex flex-col justify-center items-center P1">
            <div className="bg-black/20 inset-0 absolute" />
            <h1 className="font-extrabold text-4xl md:text-6xl text-white -mt-40 relative"> Weddings & Engagements </h1>
            <p className="text-white text-2xl m-2 relative">With DME you will have a wonderfull wedding</p>
          </div>
          <div className="panel flex flex-col justify-center items-center P2">
            <div className="bg-black/20 inset-0 absolute" />
            <h1 className="font-extrabold text-4xl md:text-6xl text-white -mt-40 relative backdrop-blur-md"> Graduation Celebrations </h1>
            <p className="text-white text-2xl m-2 relative backdrop-blur-lg">With DME you will have a wonderfull graduation celebration 🎉🎊</p>
          </div>
          <div className="panel P3 flex flex-col justify-center items-center">
            <h1 className="font-extrabold text-4xl md:text-6xl text-black -mt-40 relative backdrop-blur-sm rounded-full">Birth Day Celebration </h1>
            <p className="text-black text-2xl m-2 relative backdrop-blur-sm rounded-full">Happy Birth Day</p>
          </div>
        </div>
      </div>
      <div className="section"></div>
    </>
  );
}

export default Services;
