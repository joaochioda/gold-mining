"use client";
import { getMyNFTs } from "@/services/nft";
import useSWR from "swr";
import { Card } from "@/components/Card";

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
    <div className="flex flex-wrap gap-9">
      {data &&
        data.map(
          (nft: NftMinted) =>
            !nftsIds().includes(nft.id) && (
              <Card key={nft.id}>
                <Card.Rarity rarity={nft.rarity} />
                <Card.Background machine={nft.type}>
                  <Card.Mint id={nft.id} />
                </Card.Background>
                <p className="pt-[8px] text-[11px]">#ID: {nft.id}</p>
                <div className="absolute inset-0 bg-black opacity-75 rounded-md pointer-events-none"></div>
              </Card>
            )
        )}
    </div>
  );
}
