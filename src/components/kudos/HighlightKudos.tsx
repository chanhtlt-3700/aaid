"use client";

import { KudoCard } from "@/components/kudos/KudoCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { mockKudos } from "@/components/kudos/mockKudos";

export function HighlightKudos() {
	const { t } = useLanguage();
	const highlights = mockKudos.filter((k) => k.isHighlighted);

	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col items-start gap-2">
				<p className="font-montserrat text-xs font-medium uppercase tracking-[2px] text-white/60 md:text-sm">
					{t.kudosPage.highlightSubtitle}
				</p>
				<h2 className="font-montserrat text-2xl font-bold leading-tight text-[#FFEA9E] md:text-3xl lg:text-[32px] lg:leading-10">
					{t.kudosPage.highlightTitle}
				</h2>
			</header>

			{highlights.length === 0 ? (
				<p className="font-montserrat text-sm text-white/60">{t.kudosPage.emptyFeed}</p>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{highlights.map((kudo) => (
						<KudoCard key={kudo.id} kudo={kudo} variant="highlight" />
					))}
				</div>
			)}
		</section>
	);
}
