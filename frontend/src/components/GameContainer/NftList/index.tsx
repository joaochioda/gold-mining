"use client";

import { getNFTs } from "@/services/game";
import { sliceNumber } from "@/utils";
import { ethers } from "ethers";
import useSWR from "swr";

export default function NftList() {
  const { data, error, isLoading } = useSWR("nfts", getNFTs, {
    // refreshInterval: 10000,
  });

  function handleDataNft() {
    if (data) {
      let nfts = [];
      for (let i = 0; i < data.length; i += 5) {
        nfts.push({
          id: data[i],
          type: data[i + 1],
          rarity: data[i + 2],
          stakedAt: data[i + 3],
          rewards: data[i + 4],
        });
      }
      return nfts;
    } else {
      return [];
    }
  }

  function rarityDictionary(rarity: number) {
    const rarityDict: Record<number, string> = {
      0: "Normal",
      1: "Uncommon",
      2: "Rare",
      3: "Epic",
    };
    return rarityDict[rarity];
  }

  function formatRewards(rewards: string) {
    const reward = ethers.formatUnits(BigInt(rewards), 18);
    return sliceNumber(reward, 0, 4);
  }

  function typeDictionary(type: number) {
    const typeDict: Record<number, string> = {
      0: "Worker",
      1: "Machine 1",
      2: "Machine 2",
    };
    return typeDict[type];
  }

  function timeStampToDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <p>
      {isLoading && "Loading..."}
      {error && "Error"}
      {data &&
        handleDataNft().map((nft) => (
          <div
            key={nft.id}
            className="border p-2 m-2 w-[240px]
          "
          >
            <p>id: {nft.id}</p>
            <p>{typeDictionary(nft.type)}</p>
            <p>{rarityDictionary(nft.rarity)}</p>
            <p>{timeStampToDate(nft.stakedAt)}</p>
            <p>{formatRewards(nft.rewards)}</p>
          </div>
        ))}
    </p>
  );
}
