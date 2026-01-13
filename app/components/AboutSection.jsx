'use client';

const AboutSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#F9F1E5] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#E6C7A8]/20"></div>
      
      {/* Content container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
            About Us
          </h1>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-linear-to-r from-[#E6C7A8] to-[#D4A574] mx-auto rounded-full"></div>
        </div>

        {/* Main content card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12">
          <p className=" text-center text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
            Welcome to <span className="font-semibold text-gray-800">DANAT ALMUHYT EVENTS</span>,where every party is a masterpiece in the making .
            We are dedicated to turning your dreams into reality. 
            Our team of experts works tirelessly to provide innovative solutions tailored to your unique vision. 
            With a commitment to excellence and a passion for creativity, we strive to exceed your expectations in every event we undertake . 
            <span className="block mt-4 sm:mt-6 text-[#E6C7A8] font-medium">Join us on this journey and let's achieve your dream .</span>
          </p>
        </div>

        {/* Stats or features section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C7A8] mb-2">100+</div>
            <div className="text-sm font-bold sm:text-base text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C7A8] mb-2">95+</div>
            <div className="text-sm font-bold sm:text-base text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C7A8] mb-2">5+</div>
            <div className="text-sm font-bold sm:text-base text-gray-600">Years Experience</div>
          </div>
        </div>

        {/* Call to action button */}
        <div className="text-center">
          <button 
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#E6C7A8] to-[#D4A574] text-white font-medium rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer"
          >
            <span className="text-sm sm:text-base md:text-lg">Back to Top</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
