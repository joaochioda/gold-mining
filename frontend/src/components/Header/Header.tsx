"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    rounded: true,
  },
];

export default function Header({ children }: { children: React.ReactNode }) {
  const router = usePathname();

  return (
    <>
      <header
        className="flex items-center
        flex-col-reverse
        sm:justify-between sm:flex-row
        pt-3
      "
      >
        <div className="flex items-center text-[18px]">
          <label className="">
            Gold
            <span className="text-yellow">MINING</span>
          </label>
        </div>

        <div className="">
          <nav className="">
            <ul className="flex gap-[16px] md:gap-[90px] ">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`text-white cursor-pointer flex items-center
                  ${
                    item.rounded &&
                    "button-hover border border-2 border-yellow rounded-[30px] px-4 py-1 text-yellow"
                  }`}
                >
                  <Link
                    href={item.url}
                    className={`text-white hover:text-yellow
                  ${
                    router === item.url &&
                    `hover:text-white opacity-50 disabled`
                  }
                      ${item.rounded && item.rounded && "text-yellow"}
                      `}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
