import { claimRewards } from "@/services/game";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function ClaimRewards() {
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
    <div>
      <Button variant={"primary"} onClick={claim}>
        Claim rewards
      </Button>
    </div>
  );
}
