"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

const footerLinks = [
	{ key: "aboutSAA" as const, href: "/dashboard" },
	{ key: "awardsInfo" as const, href: "/awards-information" },
	{ key: "sunKudos" as const, href: "/sun-kudos" },
	{ key: "standards" as const, href: "/standards" },
];

export function FooterNav() {
	const { t } = useLanguage();
	const pathname = usePathname();

	const handleActiveClick = (e: React.MouseEvent) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

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
				{footerLinks.map((link) => {
					const isActive = link.href === pathname;
					return (
						<Link
							key={link.key}
							href={link.href}
							onClick={isActive ? handleActiveClick : undefined}
							className={`font-montserrat text-sm font-bold leading-6 tracking-[0.15px] transition-colors lg:text-base ${
								isActive ? "text-[#FFEA9E]" : "text-white hover:text-[#FFEA9E]"
							}`}
						>
							{t.homepage.nav[link.key]}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
