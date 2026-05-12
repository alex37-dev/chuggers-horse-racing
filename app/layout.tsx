import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Chuggers Racing League", description: "Chuggers Racing League live site" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
