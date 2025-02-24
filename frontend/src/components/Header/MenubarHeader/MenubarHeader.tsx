import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getAddress } from "@/utils";
import Link from "next/link";

export default function MenuBarHeader({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  const user = getAddress();

  return (
    <NavigationMenu className="min-w-full [&>div]:w-full hidden sm:flex mb-2">
      <NavigationMenuList className="py-2 flex justify-between bg-slate-950  px-2 lg:flex-row flex-col">
        <p className="text-white flex-1 mb-2 lg:mb-0">User: {user}</p>
        <div className="flex flex-1 justify-between gap-4">
          {items.map((item) => (
            <NavigationMenuItem key={item.title}>
              <Link href={item.url} passHref>
                <Button className="min-w-[128px]">{item.title}</Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
