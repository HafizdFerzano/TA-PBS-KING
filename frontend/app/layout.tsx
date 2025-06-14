import type { Metadata } from "next";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "SHAPE EXPLORER",
  description: "LEARN SHAPE WITH AR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
