import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Geist (variable font) — already shipped by create-next-app under app/fonts/
export const geist = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

// Inter — used only for tag pills (PRD §3.2)
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
  display: "swap",
});

// STK Bureau Serif — display face for all headings.
// Trial files are checked into public/fonts/. Swap in the licensed weights
// before launch.
export const stkBureauSerif = localFont({
  src: [
    {
      path: "../public/fonts/690f7d94b25aad03f4c2a7fa_STKBureauSerif-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/690f7dd622885429d42671ff_STKBureauSerif-Book-Trial.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stk-bureau-serif",
  display: "swap",
});
