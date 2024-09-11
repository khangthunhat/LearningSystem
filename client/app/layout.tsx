import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "@/app/utils/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});
export const metadata: Metadata = {
  title: "Learning Hub",
  description: "This is a learning hub for all the students",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin_sans.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 overflow-y-auto`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
