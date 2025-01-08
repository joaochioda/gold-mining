import { getMyNFTs } from "@/services/nft";
import { rarityDictionary, typeDictionary } from "@/utils";
import Mint from "./mint";

interface NftMinted {
  id: string;
  type: number;
  rarity: number;
}

export default async function NftMinted({ user }: { user: string }) {
  const myNfts = await getMyNFTs(user);

  return (
    <div className="flex flex-col gap-2">
      {myNfts.map((nft: NftMinted) => (
        <div key={nft.id} className="flex flex-row gap-2">
          <p>{typeDictionary(nft.type)}</p>
          <p>{rarityDictionary(nft.rarity)}</p>
          <Mint id={nft.id} />
        </div>
      ))}
    </div>
  );
}
