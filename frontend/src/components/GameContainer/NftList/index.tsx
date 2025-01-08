"use client";

import { getNFTs } from "@/services/game";
import { rarityDictionary, sliceNumber, typeDictionary } from "@/utils";
import { ethers } from "ethers";
import useSWR from "swr";

export default function NftList() {
  const { data, error, isLoading } = useSWR("nfts", getNFTs, {
    // refreshInterval: 10000,
  });

  function handleDataNft() {
    if (data) {
      let nfts = [];
      for (let i = 0; i < data[0].length; i++) {
        nfts.push({
          id: data[0][i],
          type: data[1][i],
          rarity: data[2][i],
          stakedAt: data[3][i],
          rewards: data[4][i],
        });
      }
      return nfts;
    } else {
      return [];
    }
  }

  function formatRewards(rewards: string) {
    const reward = ethers.formatUnits(BigInt(rewards), 18);
    return sliceNumber(reward, 0, 4);
  }

  function timeStampToDate(timestamp: BigInt) {
    const timestampString = timestamp.toString();

    const date = new Date(Number(timestampString) * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <>
      {isLoading && "Loading..."}
      {error && "Error"}
      <div className="flex flex-wrap">
        {data &&
          handleDataNft().map((nft) => (
            <div key={nft.id} className="border p-2 m-2 w-[240px]">
              <p>id: {nft.id}</p>
              <p>{typeDictionary(nft.type)}</p>
              <p>{rarityDictionary(nft.rarity)}</p>
              <p>{timeStampToDate(nft.stakedAt)}</p>
              <p>{formatRewards(nft.rewards)}</p>
            </div>
          ))}
      </div>
    </>
  );
}
