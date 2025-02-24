"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { stakeNFT } from "@/services/game";
import Image from "next/image";

export default function Mint({ id }: { id: string }) {
  const { toast } = useToast();

  async function mintNFT() {
    const receipt = await stakeNFT(Number(id));

    if (receipt !== "error") {
      toast({
        variant: "success",
        description: "NFT staked successfully",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast({
        variant: "destructive",
        description: "Error staking NFT",
        duration: 3000,
      });
    }
  }

  return (
    <div className="z-1  flex flex-col items-center justify-center gap-[29px] absolute opacity-100">
      <Image
        src={"/icons/loading.png"}
        width={55}
        height={55}
        alt={"loader"}
        className="animate-spin duration-2000"
      />
      <button
        className={cn(
          "button-hover",
          `w-[145px] bg-yellow py-2 rounded-[30px] text-black-800`
        )}
        onClick={mintNFT}
      >
        START MINING
      </button>
    </div>
  );
}
