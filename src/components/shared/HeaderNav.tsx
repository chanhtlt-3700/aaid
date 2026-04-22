"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import { NotificationPanel } from "@/components/shared/NotificationPanel";

const navLinks = [
	{ key: "aboutSAA" as const, href: "/dashboard" },
	{ key: "awardsInfo" as const, href: "/awards-information" },
	{ key: "sunKudos" as const, href: "/sun-kudos" },
];

export function HeaderNav() {
	const pathname = usePathname();
	const { t } = useLanguage();

	const handleActiveClick = (e: React.MouseEvent) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<nav className="hidden items-center gap-6 md:flex">
			{navLinks.map((link) => {
				const isActive = link.href === pathname;
				return (
					<Link
						key={link.key}
						href={link.href}
						onClick={isActive ? handleActiveClick : undefined}
						className={`rounded px-4 py-4 font-montserrat text-sm font-bold leading-5 tracking-[0.1px] transition-colors duration-150 ${
							isActive
								? "border-b border-[#FFEA9E] text-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
								: "text-white hover:bg-white/10"
						}`}
					>
						{t.homepage.nav[link.key]}
					</Link>
				);
			})}

			<NotificationPanel />

			<ProfileDropdown />
		</nav>
	);
}
