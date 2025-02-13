"use client";

import { useEffect } from "react";
import useMetamask from "@/hooks/useMetamask";

export default function Logout() {
  const { logout } = useMetamask();

  useEffect(() => {
    logout();
  }, []);

  return <></>;
}
