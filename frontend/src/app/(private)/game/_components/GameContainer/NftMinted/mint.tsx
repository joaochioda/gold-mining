"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { stakeNFT } from "@/services/game";

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

  return <Button onClick={mintNFT}>Mine</Button>;
}
