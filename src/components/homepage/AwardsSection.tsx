"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { awardsData } from "@/components/homepage/awardsData";
import { AwardCard } from "@/components/homepage/AwardCard";

export function AwardsSection() {
	const { t } = useLanguage();

	return (
		<section className="mx-auto w-full max-w-[1224px] px-3 sm:px-6 md:px-8 xl:px-0">
			{/* Section header */}
			<div className="mb-20 flex flex-col gap-4">
				<p className="font-montserrat text-xl font-bold leading-8 text-white md:text-2xl">
					{t.homepage.awards.caption}
				</p>
				<h2 className="font-montserrat text-3xl font-bold leading-tight text-[#FFEA9E] md:text-5xl md:leading-[64px] lg:text-[57px]" style={{ letterSpacing: "-0.25px" }}>
					{t.homepage.awards.title}
				</h2>
				<p className="max-w-2xl font-montserrat text-base font-normal leading-6 tracking-[0.5px] text-white">
					{t.homepage.awards.description}
				</p>
			</div>

			{/* Awards grid */}
			<div className="grid grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-x-[108px] lg:gap-y-16">
				{awardsData.map((award) => (
					<AwardCard key={award.id} award={award} homepage={t.homepage} />
				))}
			</div>
		</section>
	);
}
