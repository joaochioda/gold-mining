"use client";

import { getNFTs } from "@/services/game";
import { rarityDictionary, sliceNumber, typeDictionary } from "@/utils";
import { ethers } from "ethers";
import useSWR from "swr";
import NftMinted from "../NftMinted";
import ClaimRewards from "../ClaimRewards";
import Rewards from "../Rewards";
import { Card } from "@/components/Card";
import getRewards from "../Rewards";

export default function NftList({ user }: { user: string }) {
  const { data, error, isLoading } = useSWR("nfts", getNFTs, {
    revalidateOnFocus: false,
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
    return sliceNumber(reward, 0, 3);
  }

  function timeStampToDate(timestamp: BigInt) {
    const timestampString = timestamp.toString();

    const date = new Date(Number(timestampString) * 1000);
    let day: string | number = date.getDate();
    day = day < 10 ? `0${day}` : day.toString();

    let month: string | number = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month.toString();

    const year = date.getFullYear();

    let hours: string | number = date.getHours();
    hours = hours < 10 ? `0${hours}` : hours.toString();

    let minutes: string | number = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const rewards = getRewards();

  return (
    <>
      {isLoading && <p className="py-[80px] ">Loading...</p>}
      {error && "Error"}

      <div>
        {data && (
          <>
            <NftMinted user={user} nfts={handleDataNft()} />
            <h3 className="text-[36px] pt-[96px] pb-[80px] flex items-center gap-7">
              MY NFTS
              <ClaimRewards rewards={rewards} />
            </h3>
            <div className="flex flex-wrap gap-9">
              {handleDataNft().map(
                (nft) =>
                  nft.type !== BigInt(3) && (
                    <Card key={nft.id}>
                      <Card.Rarity rarity={nft.rarity} />
                      <Card.Background
                        machine={nft.type}
                        timer={timeStampToDate(nft.stakedAt)}
                      />
                      <p className="pt-[8px] text-[11px]">#ID: {nft.id}</p>
                      <Card.Farm value={formatRewards(nft.rewards)} />
                    </Card>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
