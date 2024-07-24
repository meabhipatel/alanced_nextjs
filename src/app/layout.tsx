import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Alanced",
	description:
		"Discover a diverse range of freelance opportunities on Alanced.com. Connect with talented professionals, manage projects efficiently, and grow your business with our secure, user-friendly platform. Join Alanced.com today and find the perfect freelance talent to meet your needs.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
