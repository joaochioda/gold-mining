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

  if (isLoading) return <p className="py-[80px]">Loading...</p>;

  function nftsIds() {
    if (nfts) {
      return nfts.map((nft: any) => nft.id);
    } else {
      return [];
    }
  }

  function filterNfts() {
    if (data) {
      return data.filter((nft: NftMinted) => !nftsIds().includes(nft.id));
    } else {
      return [];
    }
  }

  if (filterNfts().length === 0) {
    return <></>;
  }

  return (
    <>
      <h3 className="text-[36px] py-[80px]">NFTS ON STANDBY</h3>
      <div className="flex flex-wrap gap-9">
        {filterNfts().map((nft: NftMinted) => (
          <Card key={nft.id}>
            {nft.type != 3 && <Card.Rarity rarity={nft.rarity} />}
            <Card.Background machine={nft.type}>
              <Card.Mint id={nft.id} />
            </Card.Background>
            <p className="pt-[8px] text-[11px]">#ID: {nft.id}</p>
            <div className="absolute inset-0 bg-black opacity-75 rounded-md pointer-events-none"></div>
          </Card>
        ))}
      </div>
    </>
  );
}
