"use client";

import { useToast } from "@/hooks/use-toast";
import { mintNFT } from "@/services/nft";

export default function ShopContainer() {
  const { toast } = useToast();

  const nfts = [
    {
      name: "Worker",
      price: 1,
      rewardsPerDay: 1,
    },
    {
      name: "Machine 1",
      price: 4,
      rewardsPerDay: 4,
    },
    {
      name: "Machine 2",
      price: 16,
      rewardsPerDay: 16,
    },
    {
      name: "VIP",
      price: 20,
      rewardsPerDay: "+100%",
    },
  ];

  async function buyNft(index: number) {
    const receipt = await mintNFT(index);
    if (receipt !== "error") {
      toast({
        variant: "success",
        description: "NFT bought successfully",
        duration: 3000,
      });
    } else {
      toast({
        variant: "destructive",
        description: "Error buying NFT",
        duration: 3000,
      });
    }
  }

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {nfts.map((nft, index) => {
          return (
            <div key={index} className="border p-2 m-2 w-[240px]">
              <h2>{nft.name}</h2>
              <p>Price: {nft.price}</p>
              <p>Rewards per day: {nft.rewardsPerDay}</p>
              <button onClick={() => buyNft(index)}>Buy</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
