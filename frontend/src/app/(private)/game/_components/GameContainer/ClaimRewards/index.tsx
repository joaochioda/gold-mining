import { claimRewards } from "@/services/game";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ClaimRewards({ rewards }: { rewards: string }) {
  const { toast } = useToast();

  async function claim() {
    const receipt = await claimRewards();
    if (receipt === "error") {
      toast({
        variant: "destructive",
        description: "Error claiming rewards",
        duration: 3000,
      });
    } else {
      toast({
        variant: "success",
        description: "Rewards claimed",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  return (
    <button
      className={cn(
        "button-hover",
        `px-4 bg-yellow py-2 rounded-[30px] text-black-800 text-[16px]`
      )}
      onClick={claim}
    >
      CLAIM REWARDS ({rewards})
    </button>
  );
}
