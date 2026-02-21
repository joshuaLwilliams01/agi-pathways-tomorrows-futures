import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AGI Pathways: Tomorrow's Futures",
  description:
    "A web-based strategy game about AI safety and governance. Shape the future of AGI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-vh-100">
        {children}
      </body>
    </html>
  );
}
