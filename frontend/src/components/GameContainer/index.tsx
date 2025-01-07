import { getBalance } from "@/services/token";
import { cookies } from "next/headers";
import NftList from "./NftList";
import { sliceNumber } from "@/utils";

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
      <NftList />
    </>
  );
}
