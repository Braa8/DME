import { Old_Standard_TT } from "next/font/google";
import './globals.css';


const Old_standard_TT = Old_Standard_TT({
  subsets: ['latin'],
  weight: ['400', '700',], // ملاحظة: بعض الأوزان قد لا تكون متوفرة
  variable: '--font-oleo-script',
  display: 'swap', // ⭐ إضافة مهمة لتحسين الأداء
   preload: true, // ⭐ اختياري - مفيد إذا كان الخط أساسياً
   adjustFontFallback: false, 
})

export const metadata = {
  title: "DME",
  description: "Events Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${Old_standard_TT.variable} ${Old_standard_TT.className}`}>
      {/* ⭐ استخدم المتغير والكلاس معاً للمرونة */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}