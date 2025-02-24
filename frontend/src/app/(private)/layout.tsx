import Header from "@/components/Header/Header";
import UserInfo from "@/components/UserInfo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1280px] m-auto pb-10">
      <Header>
        <UserInfo />
        {children}
      </Header>
    </div>
  );
}
