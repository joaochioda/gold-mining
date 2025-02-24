"use client";

import { useToast } from "@/hooks/use-toast";
import { mintNFT, mintVIP } from "@/services/nft";
import { getCookie } from "@/utils";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { isVip } from "@/services/game";

export default function ShopContainer() {
  const { toast } = useToast();
  const [isVipState, setIsVipState] = useState(false);
  const [loading, setLoading] = useState(true);

  const nfts = [
    {
      name: "Worker",
      price: 1,
      rewardsPerDay: 1,
      type: 0,
      func: buyNft,
    },

    {
      name: "Machine 1",
      price: 4,
      rewardsPerDay: 4,
      type: 1,
      func: buyNft,
    },
    {
      name: "Machine 2",
      price: 16,
      rewardsPerDay: 16,
      type: 2,
      func: buyNft,
    },
    {
      name: "VIP",
      price: 20,
      rewardsPerDay: "+100%",
      type: 3,
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

  async function getIsVip() {
    const user = getCookie("address");
    const vip = await isVip(user!);
    setIsVipState(vip);
    setLoading(false);
  }

  useEffect(() => {
    getIsVip();
  }, []);

  return (
    <div>
      <h3 className="text-[36px] py-[80px]">SHOP YOUR NFT</h3>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex flex-wrap gap-9">
          {nfts.map(
            (nft, index) =>
              isVipState && nft.type === 3 ? null : (
                <Card key={nft.type}>
                  <Card.Background machine={nft.type} />
                </Card>
              )
            // <div key={index} className="border p-2 m-2 w-[240px]">
            //   <p>{nft.name}</p>
            //   <p>Price: {nft.price}</p>
            //   <p>Rewards per day: {nft.rewardsPerDay}</p>
            //   <Button onClick={() => nft.func(index)}>Buy</Button>
            // </div>
          )}
        </div>
      )}
    </div>
  );
}
