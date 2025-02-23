import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { typeImage } from "@/utils";
import Image from "next/image";
export default function Background({
  machine,
  timer,
}: {
  machine: number;
  timer: string;
}) {
  const machineImage = typeImage(machine);
  return (
    <div
      style={{ backgroundImage: `url(${machineImage})` }}
      className="bg-cover bg-center bg-no-repeat w-[249px] h-[365px]"
    >
      <div className="p-[10px]">
        <div
          className="bg-white py-[6px] px-[12px] rounded-[38px]
          inline-block "
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
    </div>
  );
}
