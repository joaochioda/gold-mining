import { cookies } from "next/headers";
import NftList from "./NftList";

export default async function GameContainer() {
  const cookieStore = await cookies();
  const user = cookieStore.get("address");

  if (!user) {
    return <p>Usuário não conectado</p>;
  }

  return (
    <>
      <NftList user={user.value} />
    </>
  );
}
