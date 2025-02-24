import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function Rarity({
  rarity,
  className = "",
}: {
  rarity: number;
  className?: string;
}) {
  const images: { [key: number]: string } = {
    0: "/images/rarity/0.png",
    1: "/images/rarity/1.png",
    2: "/images/rarity/2.png",
    3: "/images/rarity/3.png",
  };

  const bonusRarity: { [key: number]: string } = {
    0: "+0%",
    1: "+25%",
    2: "+50%",
    3: "+100%",
  };

  return (
    <div
      className={cn(
        className,
        "bg-[#4E456A] w-[73px] h-[73px] rounded-[50%] absolute right-[8px] top-[7px] flex items-center justify-center"
      )}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <img
              src={images[rarity]}
              alt="rarity"
              className="w-[58px] h-[58px]"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Rarity: {Number(rarity) + 1}</p>
            <p>Bonus: {bonusRarity[rarity]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
