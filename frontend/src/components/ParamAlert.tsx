"use client";

import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ParamAlert() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const successParam = searchParams.get("success");
    const entityName = searchParams.get("entity");

    if (successParam) {
      const timeoutId = setTimeout(() => {
        toast({
          variant: "success",
          description: `${entityName} ${successParam}!`,
          duration: 3000,
        });

        const currentPath = window.location.pathname;
        router.replace(currentPath);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchParams, toast, router]);

  return null;
}
