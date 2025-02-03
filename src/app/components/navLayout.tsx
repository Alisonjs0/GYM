"use client";

import NavBar from "./navBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientWrapper() {
  const pathname = usePathname();
  const hideNavBar = pathname === "/login";

  return <>{!hideNavBar && <NavBar />}</>;
}
