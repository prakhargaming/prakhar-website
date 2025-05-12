import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
        signIn: {
          variables: { colorPrimary: "red", borderRadius: "0" },
        },
      }}
    >
      <html lang="en" className={inter.className}>
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
