import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates, Share_Tech_Mono } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { PageTransition } from "@/components/shared/PageTransition";
import "./globals.css";

const montserrat = Montserrat({
	weight: "700",
	subsets: ["latin", "vietnamese"],
	variable: "--font-montserrat",
});

const montserratAlt = Montserrat_Alternates({
	weight: "700",
	subsets: ["latin", "vietnamese"],
	variable: "--font-montserrat-alt",
});

const shareTechMono = Share_Tech_Mono({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
	title: "SAA 2025 - Sun Annual Awards",
	description: "Sun Annual Awards 2025 - ROOT FURTHER",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body className={`${montserrat.variable} ${montserratAlt.variable} ${shareTechMono.variable} antialiased`}>
				<LanguageProvider>
					<PageTransition>{children}</PageTransition>
				</LanguageProvider>
			</body>
		</html>
	);
}
