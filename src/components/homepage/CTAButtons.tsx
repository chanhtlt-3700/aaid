"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export function CTAButtons() {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
			<Link
				href="/awards-information"
				className="group flex items-center justify-center gap-2 rounded-lg bg-[#FFEA9E] px-6 py-4 font-montserrat text-lg font-bold leading-7 text-[#00101A] transition-all duration-200 hover:border hover:border-[#998C5F] hover:bg-[rgba(255,234,158,0.1)] hover:text-white md:text-[22px] md:leading-7"
			>
				{t.homepage.hero.aboutAwards}
			</Link>
			<Link
				href="/sun-kudos"
				className="group flex items-center justify-center gap-2 rounded-lg border border-[#998C5F] bg-[rgba(255,234,158,0.1)] px-6 py-4 font-montserrat text-lg font-bold leading-7 text-white transition-all duration-200 hover:border-transparent hover:bg-[#FFEA9E] hover:text-[#00101A] md:text-[22px] md:leading-7"
			>
				{t.homepage.hero.aboutKudos}
			</Link>
		</div>
	);
}
