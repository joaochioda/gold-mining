import { cn } from "@/lib/utils";
import Background from "./Background";
import Farm from "./Farm";
import Mint from "./Mint";
import Rarity from "./Rarity";

function Card({
  classNames = "",
  children,
}: {
  classNames?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        classNames,
        "w-[289px] h-[451px] bg-[#4E456A] p-5 rounded-[9px] relative"
      )}
    >
      {children}
    </div>
  );
}
Card.Rarity = Rarity;
Card.Background = Background;
Card.Farm = Farm;
Card.Mint = Mint;

export { Card };
