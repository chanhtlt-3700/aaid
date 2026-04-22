"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { mockUserStats } from "@/components/kudos/mockKudos";

export function KudosSidebar() {
	const { t } = useLanguage();
	const stats = mockUserStats;
	const canOpenGift = stats.secretBoxes > 0;

	const rows: Array<{ label: string; value: number }> = [
		{ label: t.kudosPage.sidebar.kudosReceived, value: stats.kudosReceived },
		{ label: t.kudosPage.sidebar.kudosSent, value: stats.kudosSent },
		{ label: t.kudosPage.sidebar.heartsReceived, value: stats.heartsReceived },
		{ label: t.kudosPage.sidebar.heartsGiven, value: stats.heartsGiven },
		{ label: t.kudosPage.sidebar.secretBoxes, value: stats.secretBoxes },
		{ label: t.kudosPage.sidebar.secretBoxesOpened, value: stats.secretBoxesOpened },
	];

	return (
		<aside className="flex flex-col gap-6">
			<section
				aria-label={t.kudosPage.sidebar.title}
				className="flex flex-col gap-4 rounded-xl border border-[#2E3940] bg-white/5 p-5"
			>
				<h3 className="font-montserrat text-base font-bold uppercase tracking-[0.5px] text-[#FFEA9E]">
					{t.kudosPage.sidebar.title}
				</h3>
				<dl className="flex flex-col gap-3">
					{rows.map((row) => (
						<div key={row.label} className="flex items-center justify-between gap-4">
							<dt className="font-montserrat text-sm font-medium text-white/70">{row.label}</dt>
							<dd className="font-montserrat text-xl font-bold text-[#FFEA9E]">{row.value}</dd>
						</div>
					))}
				</dl>
				<button
					type="button"
					disabled={!canOpenGift}
					className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#FFEA9E] px-6 font-montserrat text-sm font-bold text-[#00101A] transition-colors hover:bg-[#fff8e1] disabled:cursor-not-allowed disabled:opacity-40"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mr-2">
						<path
							d="M4 8h16M12 8v13M6 8a4 4 0 016-4 4 4 0 016 4M4 8v13h16V8"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					{t.kudosPage.sidebar.openGift}
				</button>
			</section>

			<section className="flex flex-col gap-3 rounded-xl border border-[#2E3940] bg-white/5 p-5">
				<h3 className="font-montserrat text-xs font-bold uppercase tracking-[1.5px] text-white/70">
					{t.kudosPage.sidebar.recentRankings}
				</h3>
				<p className="font-montserrat text-sm text-white/50">{t.kudosPage.sidebar.noData}</p>
			</section>

			<section className="flex flex-col gap-3 rounded-xl border border-[#2E3940] bg-white/5 p-5">
				<h3 className="font-montserrat text-xs font-bold uppercase tracking-[1.5px] text-white/70">
					{t.kudosPage.sidebar.recentGifts}
				</h3>
				<p className="font-montserrat text-sm text-white/50">{t.kudosPage.sidebar.noData}</p>
			</section>
		</aside>
	);
}
