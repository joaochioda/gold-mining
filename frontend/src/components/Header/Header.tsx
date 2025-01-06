import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import MenuBarHeader from "./MenubarHeader/MenubarHeader";
import SidebarHeader from "./SidebarHeader/SidebarHeader";

const items = [
  {
    title: "Game",
    url: "/game",
  },
  {
    title: "Shop",
    url: "/shop",
  },
  {
    title: "Logout",
    url: "/logout",
  },
];

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarHeader items={items} />
        <div className="w-full">
          <SidebarTrigger className="flex sm:hidden" />
          <MenuBarHeader items={items} />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
