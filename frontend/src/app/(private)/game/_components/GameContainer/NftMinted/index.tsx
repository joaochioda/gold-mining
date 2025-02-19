"use client";
import { getMyNFTs } from "@/services/nft";
import { rarityDictionary, typeDictionary } from "@/utils";
import Mint from "./mint";
import useSWR from "swr";

interface NftMinted {
  id: string;
  type: number;
  rarity: number;
}

export default function NftMinted({ user, nfts }: { user: string; nfts: any }) {
  const { data, error, isLoading } = useSWR(
    "getMyNFTs",
    () => getMyNFTs(user),
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <p>Loading...</p>;

  function nftsIds() {
    if (nfts) {
      return nfts.map((nft: any) => nft.id);
    } else {
      return [];
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {data &&
        data.map(
          (nft: NftMinted) =>
            !nftsIds().includes(nft.id) && (
              <div key={nft.id} className="flex flex-row gap-2">
                <p>{typeDictionary(nft.type)}</p>
                <p>{rarityDictionary(nft.rarity)}</p>
                <Mint id={nft.id} />
              </div>
            )
        )}
    </div>
  );
}
