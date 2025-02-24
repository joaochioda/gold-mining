import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { typeImage } from "@/utils";
import Image from "next/image";
export default function Background({
  machine,
  timer,
  className = "",
  children,
}: {
  machine: number;
  timer?: string | null;
  children?: React.ReactNode;
  className?: string;
}) {
  const machineImage = typeImage(machine);
  return (
    <div
      style={{ backgroundImage: `url(${machineImage})` }}
      className={cn(
        className,
        "bg-cover bg-center bg-no-repeat w-[249px] h-[365px]"
      )}
    >
      {timer && (
        <div className="p-[10px]">
          <div
            className="bg-white py-[6px] px-[12px] rounded-[38px]
          inline-block
          opacity-[0.8]
          "
          >
            <p className="text-black text-[11px] flex gap-1">
              <Image
                src={"/icons/timer.png"}
                width={14}
                height={14}
                alt={""}
                className="h-fit"
              />
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>{timer}</TooltipTrigger>
                  <TooltipContent>
                    <p>{timer}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </div>
        </div>
      )}

      {children && (
        <div className="flex justify-center items-center h-full">
          {children}
        </div>
      )}
    </div>
  );
}
