import type { Metadata } from "next";
import { Roboto, Braah_One } from "next/font/google";
import ThemeLayout from "@/components/ThemeLayout";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

const braahOne = Braah_One({
  subsets: ["latin"],
  variable: "--font-braah-one",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Gold Mining",
  description: "Earn gold by playing games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
        ${roboto.className} ${braahOne.variable} light`}
      >
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
