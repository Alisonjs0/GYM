"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsLogged = sessionStorage.getItem("isLogged");
      setIsLogged(storedIsLogged === "true");
    }
  }, []);

  const redirect = () => {
    if (!hasRedirected) {
      setHasRedirected(true);
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  };

  return { isLogged, redirect, hasRedirected };
};
