"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function SpotlightPlaceholder() {
	const { t } = useLanguage();

	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col items-start gap-2">
				<p className="font-montserrat text-xs font-medium uppercase tracking-[2px] text-white/60 md:text-sm">
					{t.kudosPage.spotlightSubtitle}
				</p>
				<h2 className="font-montserrat text-2xl font-bold leading-tight text-[#FFEA9E] md:text-3xl lg:text-[32px] lg:leading-10">
					{t.kudosPage.spotlightTitle}
				</h2>
			</header>
			<div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-[#2E3940] bg-white/[0.03]">
				<p className="font-montserrat text-sm text-white/50">
					{t.kudosPage.spotlightComingSoon}
				</p>
			</div>
		</section>
	);
}
