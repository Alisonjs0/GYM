import type { Metadata } from "next";
import "./styles/globals.css";

import NavLayout from "./components/navLayout";

export const metadata: Metadata = {
  title: "GYM"
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
            <body>
              <NavLayout></NavLayout>
              {children}
            </body>
    </html>
  );
}
