// app/components/ContactPage.jsx
'use client';
import React, { useRef, useState, useEffect } from 'react';
import {FaFacebookF, FaInstagram,FaWhatsapp } from 'react-icons/fa';
// Dynamic import للـ GSAP بدون SSR
const ContactPage = () => {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (isClient && containerRef.current) {
      // تحميل GSAP فقط على العميل
      import('gsap').then(({ default: gsap }) => {
        import('@gsap/react').then(({ useGSAP }) => {
          gsap.registerPlugin(useGSAP);
          
          // أنيميشن دخول الصفحة
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1 }
          });

          tl.fromTo('.contact-title',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0 }
          )
          .fromTo('.contact-card',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, stagger: 0.2 },
            "-=0.5"
          )
          .fromTo('.form-element',
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, stagger: 0.1 },
            "-=0.3"
          );
        });
      });
    }
  }, [isClient]);

  

  // إذا لم يكن العميل بعد، عرض نسخة بسيطة
  if (!isClient) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400">
              Let's Create Something Amazing
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-linear-to-br from-[#E6C7A8] via-[#8A103DAA] to-[#E6C7A8] text-gray-900 py-12 px-4">
      {/* تأثيرات الخلفية */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16 contact-title">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-purple-950 to-blue-950">
            Let's Create Something Amazing
          </h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            Ready to bring your vision to life? Get in touch with us and let's start your journey
          </p>
        </div>

        <div className="flex flex-col justify-center items-center lg:flex-col-2 gap-12">
         

          {/* معلومات الاتصال */}
          <div className="space-y-8">
            <div className="contact-card bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-800 active:scale-95 rounded-2xl transition-all duration-300 hover:cursor-pointer">
                  <div className="p-3 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-xl">
                    <FaWhatsapp className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <a href="https://wa.me/971552556144" target='_blank'>
                    <h4 className="font-semibold text-gray-400 text-lg">WhatsApp</h4>
                    <p className="text-gray-400">+971 55 255 6144</p>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-800 active:scale-95 rounded-2xl transition-all duration-300 hover:cursor-pointer">
                  <div className="p-3 bg-linear-to-r from-blue-600/20 to-cyan-600/20 rounded-xl">
                    <FaFacebookF className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <a href="https://facebook.com" target='_blank'>
                    <h4 className="font-semibold text-gray-400 text-lg">Facebook</h4>
                    <p className="text-gray-400">click to visit our page</p>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-800 active:scale-95 rounded-2xl transition-all duration-300 hover:cursor-pointer">
                  <div className="p-3 bg-linear-to-r from-cyan-600/20 to-emerald-600/20 rounded-xl">
                    <FaInstagram className="text-2xl text-cyan-400" />
                  </div>
                  <div>
                    <a href="https://instagram.com/danat_almuhyt_events" target='_blank'>
                    <h4 className="font-semibold text-gray-400 text-lg">Instagram</h4>
                    <p className="text-gray-400">click to visit our page</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الأسئلة الشائعة */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4 backdrop-brightness-105">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: "How soon will you respond?", a: "Within 24 hours during business days" },
              { q: "Do you have customized offers and packages?", a: "Yes, we have many packages and offers." },
              { q: "Can colors and shapes be customized in my celebrations?", a: "Yes, it is possible, and this is what enables us to provide the best service to customers in line with their vision" },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
                <p className="text-black text-md">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-white/10 text-center text-gray-900 text-lg">
        <p>© {new Date().getFullYear()} DME Events. All rights reserved.</p>
        <p className="text-sm mt-2">Transforming visions into unforgettable experiences</p>
      </footer>
    </div>
  );
};

export default ContactPage;