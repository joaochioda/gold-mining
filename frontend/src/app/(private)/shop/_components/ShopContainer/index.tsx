"use client";

import { useToast } from "@/hooks/use-toast";
import { mintNFT, mintVIP } from "@/services/nft";
import { getCookie } from "@/utils";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { isVip } from "@/services/game";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
          {nfts.map((nft, index) =>
            isVipState && nft.type === 3 ? null : (
              <Card key={nft.type}>
                <Card.Background machine={nft.type} />
                <div className="pt-2">
                  <div className="flex items-center align-center gap-2">
                    <Image
                      src={`/icons/arrow-up.png`}
                      width={11}
                      height={11}
                      alt="arrow"
                    />
                    <p className="text-[12px] text-[#7FDF86] font-light">{`Farm ${nft.price}/day`}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[18px] text-yellow ">${nft.price}</p>
                    <button
                      className={cn(
                        "button-hover",
                        `px-4 bg-yellow py-1 rounded-[30px] text-black-800 text-[12px]`
                      )}
                      onClick={() => nft.func(index)}
                    >
                      PURCHASE
                    </button>
                  </div>
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
