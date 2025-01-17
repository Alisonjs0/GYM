import type { Metadata } from "next";
import "./styles/globals.css";

import NavBar from "./components/navBar";
import NavLayout from "./components/navLayout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body>
        <NavLayout></NavLayout>
        {children}
      </body>
    </html>
  );
}
