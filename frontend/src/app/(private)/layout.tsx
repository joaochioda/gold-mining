"use client";

import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1280px] m-auto pb-10">
      <Header>{children}</Header>
    </div>
  );
}
