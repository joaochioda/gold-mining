import { getBalance } from "@/services/token";
import { cookies } from "next/headers";
import NftList from "./NftList";
import { sliceNumber } from "@/utils";
import { isVip } from "@/services/game";

export default async function GameContainer() {
  const cookieStore = await cookies();
  const user = cookieStore.get("address");

  if (!user) {
    return <p>Usuário não conectado</p>;
  }

  let balancePromise = getBalance(user?.value!);
  let vipPromise = isVip(user?.value!);

  let [balance, vip] = await Promise.all([balancePromise, vipPromise]);

  balance = sliceNumber(balance, 0, 4);

  return (
    <>
      {balance && <p>Balance: {balance}</p>}
      {vip && <p>VIP</p>}
      <NftList user={user.value} />
    </>
  );
}
