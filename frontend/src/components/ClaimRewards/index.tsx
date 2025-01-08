import { claimRewards } from "@/services/game";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

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
