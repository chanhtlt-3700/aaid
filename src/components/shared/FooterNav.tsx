"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

const footerLinks = [
	{ key: "aboutSAA" as const, href: "/dashboard" },
	{ key: "awardsInfo" as const, href: "/awards-information" },
	{ key: "sunKudos" as const, href: "/sun-kudos" },
	{ key: "standards" as const, href: "/standards" },
];

export function FooterNav() {
	const { t } = useLanguage();

	return (
		<div className="flex items-center gap-20">
			<Image
				src="/assets/homepage/images/saa-logo-footer.png"
				alt="SAA 2025"
				width={69}
				height={64}
				className="h-12 w-auto lg:h-16"
			/>
			<nav className="hidden items-center gap-6 md:flex lg:gap-20">
				{footerLinks.map((link) => (
					<Link
						key={link.key}
						href={link.href}
						className="font-montserrat text-sm font-bold leading-6 tracking-[0.15px] text-white transition-colors hover:text-[#FFEA9E] lg:text-base"
					>
						{t.homepage.nav[link.key]}
					</Link>
				))}
			</nav>
		</div>
	);
}
