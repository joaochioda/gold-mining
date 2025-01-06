import ServerActionsList from "@/components/ServerActionsContainer/ServerActionsList/ServerActionsList";
import { Suspense } from "react";

export default function ServerActionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServerActionsList />
    </Suspense>
  );
}
