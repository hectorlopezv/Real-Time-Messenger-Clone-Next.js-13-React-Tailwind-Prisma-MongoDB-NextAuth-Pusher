import ToasterContext from "./context/ToastsContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Time Messenger clone",
  description: "Next.js messenger lite clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <ToasterContext />
          {children}
        </>
      </body>
    </html>
  );
}
