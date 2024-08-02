import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AppLayout from "./AppLayout";
import AuthProvider from "@/components/AuthProvider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_BASE_URL}`),
  title: {
    default: "Alanced",
    template: "%s - Best platform for freelancer",
  },
  description:
    "Discover a diverse range of freelance opportunities on Alanced.com. Connect with talented professionals, manage projects efficiently, and grow your business with our secure, user-friendly platform. Join Alanced.com today and find the perfect freelance talent to meet your needs.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="WLVA4Hdid84_o9VlZzbl4154ZqFdi-TtOtx_JigH8Hk"
        />
      </head>
      <body className={poppins.className}>
        <StoreProvider>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
