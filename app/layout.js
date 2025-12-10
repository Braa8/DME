import { Playfair_Display } from "next/font/google";
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'], // ملاحظة: بعض الأوزان قد لا تكون متوفرة
  variable: '--font-playfair-display',
  display: 'swap', // ⭐ إضافة مهمة لتحسين الأداء
  // preload: true, // ⭐ اختياري - مفيد إذا كان الخط أساسياً
  // adjustFontFallback: true, // ⭐ لتحسين الخطوط الاحتياطية
});

export const metadata = {
  title: "DME",
  description: "Events Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${playfairDisplay.className}`}>
      {/* ⭐ استخدم المتغير والكلاس معاً للمرونة */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}