import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
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
			<body className={`${montserrat.variable} ${montserratAlt.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
