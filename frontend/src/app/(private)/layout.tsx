"use client";

import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1320px] m-auto p-4">
      <Header>{children}</Header>
    </div>
  );
}
