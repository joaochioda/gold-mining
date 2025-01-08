import { getBalance } from "@/services/token";
import { cookies } from "next/headers";
import NftList from "./NftList";
import { sliceNumber } from "@/utils";
import NftMinted from "./NftMinted";

export default async function GameContainer() {
  const cookieStore = await cookies();
  const user = cookieStore.get("address");

  if (!user) {
    return <p>Usuário não conectado</p>;
  }

  let balance = await getBalance(user?.value!);
  balance = sliceNumber(balance, 0, 4);

  return (
    <>
      {balance && <p>Balance: {balance}</p>}
      <NftMinted user={user.value} />
      <NftList />
    </>
  );
}
