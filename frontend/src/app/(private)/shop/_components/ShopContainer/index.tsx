"use client";

import { useToast } from "@/hooks/use-toast";
import { mintNFT, mintVIP } from "@/services/nft";
import { getCookie } from "@/utils";
import { Button } from "../../../../../components/ui/button";

export default function ShopContainer() {
  const { toast } = useToast();

  const nfts = [
    {
      name: "Worker",
      price: 1,
      rewardsPerDay: 1,
      type: "regular",
      func: buyNft,
    },

    {
      name: "Machine 1",
      price: 4,
      rewardsPerDay: 4,
      type: "regular",
      func: buyNft,
    },
    {
      name: "Machine 2",
      price: 16,
      rewardsPerDay: 16,
      type: "regular",
      func: buyNft,
    },
    {
      name: "VIP",
      price: 20,
      rewardsPerDay: "+100%",
      type: "vip",
      func: buyVip,
    },
  ];

  const handleToast = (
    variant: "success" | "destructive" | "default",
    description: string
  ) => {
    toast({
      variant,
      description,
      duration: 3000,
    });
  };

  async function buyVip() {
    const user = getCookie("address");
    const receipt = await mintVIP(user!);

    if (receipt === "error") {
      handleToast("destructive", "Error buying VIP");
    } else if (receipt === "alreadyHasVip") {
      handleToast("default", "You already have VIP");
    } else {
      handleToast(
        "success",
        "VIP bought successfully, don't forget to activate it"
      );
    }
  }

  async function buyNft(index: number) {
    const receipt = await mintNFT(index);
    handleToast(
      receipt !== "error" ? "success" : "destructive",
      receipt !== "error" ? "NFT bought successfully" : "Error buying NFT"
    );
  }

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {nfts.map((nft, index) => (
          <div key={index} className="border p-2 m-2 w-[240px]">
            <p>{nft.name}</p>
            <p>Price: {nft.price}</p>
            <p>Rewards per day: {nft.rewardsPerDay}</p>
            <Button onClick={() => nft.func(index)}>Buy</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
