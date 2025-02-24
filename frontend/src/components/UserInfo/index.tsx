import { getBalance } from "@/services/token";
import { cookies } from "next/headers";
import { sliceNumber } from "@/utils";
import { isVip } from "@/services/game";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function UserInfo() {
  const cookieStore = await cookies();
  const user = cookieStore.get("address");

  if (!user) {
    return <p>Usuário não conectado</p>;
  }

  const slicedAddress = user.value.slice(0, 5) + "..." + user.value.slice(-4);

  let balancePromise = getBalance(user?.value!);
  let vipPromise = isVip(user?.value!);

  let [balance, vip] = await Promise.all([balancePromise, vipPromise]);

  balance = sliceNumber(balance, 0, 4);

  return (
    <div className="flex items-center gap-12 pt-20">
      <div className="flex items-center gap-7">
        <Image src="/icons/avatar.png" alt="User" width={46} height={46} />
        <p>{slicedAddress}</p>
      </div>
      <div className="w-px h-10 bg-gray-200" />
      <p>Balance: {balance}</p>
      {vip && <div className="w-px h-10 bg-gray-200" />}
      {vip && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Image src="/icons/vip.png" alt="VIP" width={36} height={36} />
            </TooltipTrigger>
            <TooltipContent>
              <p>VIP Bonus +100%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
