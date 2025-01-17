"use client";

import NavBar from "./navBar";
import { usePathname } from "next/navigation";

export default function ClientWrapper() {
    const pathname = usePathname();
    const hideNavBar = pathname === "/"
  return (
    <>
      {!hideNavBar && <NavBar />}
    </>
  );
}
