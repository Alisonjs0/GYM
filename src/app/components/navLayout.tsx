"use client";

import NavBar from "./navBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientWrapper() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const pathname = usePathname();
  const hideNavBar = pathname === "/";


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsLogged = sessionStorage.getItem("isLogged");
      setIsLogged(storedIsLogged === "true");
    }
  }, [hideNavBar]);


  if (isLogged === null) {
    return null;
  }

  return <>{!hideNavBar && isLogged && <NavBar />}</>;
}
