"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function AwardsPageTitle() {
	const { t } = useLanguage();

	return (
		<header className="flex flex-col items-start gap-2">
			<p className="font-montserrat text-sm font-bold uppercase leading-6 tracking-[0.15px] text-white/60 md:text-base">
				{t.awardsPage.caption}
			</p>
			<h1 className="font-montserrat text-3xl font-bold leading-tight text-[#FFEA9E] md:text-4xl lg:text-[44px] lg:leading-[56px]">
				{t.awardsPage.pageTitle}
			</h1>
		</header>
	);
}
