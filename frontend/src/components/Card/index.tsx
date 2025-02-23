import Background from "./Background";
import Rarity from "./Rarity";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[289px] h-[451px] bg-[#4E456A] p-5 rounded-[9px] relative">
      {children}
    </div>
  );
}
Card.Rarity = Rarity;
Card.Background = Background;

export { Card };
