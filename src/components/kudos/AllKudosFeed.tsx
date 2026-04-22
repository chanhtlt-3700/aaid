"use client";

import { KudoCard } from "@/components/kudos/KudoCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { mockKudos } from "@/components/kudos/mockKudos";

export function AllKudosFeed() {
	const { t } = useLanguage();

	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col items-start gap-2">
				<p className="font-montserrat text-xs font-medium uppercase tracking-[2px] text-white/60 md:text-sm">
					{t.kudosPage.allKudosSubtitle}
				</p>
				<h2 className="font-montserrat text-2xl font-bold leading-tight text-[#FFEA9E] md:text-3xl lg:text-[32px] lg:leading-10">
					{t.kudosPage.allKudosTitle}
				</h2>
			</header>

			{mockKudos.length === 0 ? (
				<p className="font-montserrat text-sm text-white/60">{t.kudosPage.emptyFeed}</p>
			) : (
				<div className="flex flex-col gap-4">
					{mockKudos.map((kudo) => (
						<KudoCard key={kudo.id} kudo={kudo} />
					))}
				</div>
			)}
		</section>
	);
}
