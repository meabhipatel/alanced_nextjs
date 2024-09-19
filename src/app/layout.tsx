import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AppLayout from "./AppLayout";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NEXT_PUBLIC_GOOGLE_CLIENT_ID } from "@/config";

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
        {/* ---> Adding google search console and analytics meta data */}
        <meta
          name="google-site-verification"
          content="KC3Jbcpe1LP0A4_Y2WvpfQtoJDJ6iEgKxJkwQlF_Qgk"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4D1CCC035X"
        ></script>
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4D1CCC035X');
            `,
          }}
        />
      </head>
      <body className={poppins.className}>
        <StoreProvider>
          <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <AuthProvider>
              <AppLayout>{children}</AppLayout>
            </AuthProvider>
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
