import type { Metadata } from "next";
import { Roboto, Braah_One } from "next/font/google";
import ThemeLayout from "@/components/ThemeLayout";
import "../globals.css";
import Favicon from "/public/images/favicon.ico";
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
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
        ${roboto.className} ${braahOne.variable}`}
      >
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
