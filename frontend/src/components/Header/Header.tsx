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
      "
      >
        <div className="flex items-center">
          <img
            src={"/images/gold.png"}
            alt="Gold Mining"
            width={32}
            height={32}
          />
          <label className="pl-4">
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
                    "border border-2 border-white rounded-[93px] px-4 py-2"
                  }`}
                >
                  <Link
                    href={item.url}
                    className={`text-white hover:text-yellow
                  ${
                    router === item.url &&
                    `
                    hover:text-white
                    opacity-50
                    `
                  }`}
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
