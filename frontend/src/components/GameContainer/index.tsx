import { getBalance } from "@/services/token";
import { cookies } from "next/headers";

export default async function GameContainer() {
  const cookieStore = await cookies();
  const user = cookieStore.get("address");

  if (!user) {
    return <p>Usuário não conectado</p>;
  }

  let balance = await getBalance(user?.value!);
  balance = balance.slice(0, balance.indexOf(".") + 4);

  return <>{balance && <p>Balance: {balance}</p>}</>;
}
