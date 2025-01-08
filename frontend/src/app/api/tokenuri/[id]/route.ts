import { NextRequest, NextResponse } from "next/server";

// Suponha que você tenha um objeto ou banco de dados simulando os NFTs
const nft = {
  name: "NFT #1",
  description: "This is the first NFT in the collection.",
  image: "https://picsum.photos/id/1/200/300",
  attributes: [
    { trait_type: "Rarity", value: "Epic" },
    { trait_type: "Type", value: "Worker" },
  ],
};

export async function GET({ params }: any) {
  const { id } = params;

  if (nft) {
    return new NextResponse(
      JSON.stringify({
        name: `NFT #${id}`,
        description: nft.description,
        image: nft.image,
        attributes: nft.attributes,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new NextResponse(JSON.stringify({ error: "NFT not found" }), {
      status: 404,
    });
  }
}
