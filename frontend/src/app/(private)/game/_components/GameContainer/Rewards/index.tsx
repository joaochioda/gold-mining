import { totalRewards } from "@/services/game";
import { sliceNumber } from "@/utils";
import useSWR from "swr";

export default function Rewards() {
  const {
    data: rewardsData,
    error: rewardsError,
    isLoading: rewardsIsLoading,
  } = useSWR("rewards", totalRewards, {
    revalidateOnFocus: false,
  });

  return (
    <>{rewardsData && <p>Total rewards: {sliceNumber(rewardsData, 0, 4)}</p>}</>
  );
}
