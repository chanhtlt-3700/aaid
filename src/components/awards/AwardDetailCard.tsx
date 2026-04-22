"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import type { AwardDetail } from "@/components/awards/awardsDetailData";

interface Props {
	award: AwardDetail;
}

export function AwardDetailCard({ award }: Props) {
	const { t } = useLanguage();
	const titleCopy = t.homepage[award.titleKey];
	const description = t.awardsPage.descriptions[award.descriptionKey];
	const quantityUnit = t.awardsPage[award.quantityUnitKey];
	const prizeNote = award.prizeNoteKey ? t.awardsPage[award.prizeNoteKey] : null;

	return (
		<article
			id={award.slug}
			className="flex scroll-mt-28 flex-col gap-8 border-b border-[#2E3940] py-12 last:border-b-0 md:flex-row md:gap-12"
		>
			<div className="relative h-[280px] w-full shrink-0 md:h-[336px] md:w-[336px]">
				<div
					className="absolute inset-0 rounded-lg"
					style={{
						boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
					}}
				/>
				<Image
					src="/assets/homepage/images/award-ring-glow.png"
					alt=""
					fill
					sizes="(min-width: 768px) 336px, 100vw"
					className="object-contain"
					style={{ mixBlendMode: "screen" }}
				/>
				<Image
					src={award.titleImagePath}
					alt={titleCopy.title}
					fill
					sizes="(min-width: 768px) 336px, 100vw"
					className="object-contain p-10"
				/>
			</div>

			<div className="flex flex-1 flex-col gap-4">
				<h3 className="font-montserrat text-2xl font-normal leading-9 text-[#FFEA9E] md:text-[32px] md:leading-10">
					{titleCopy.title}
				</h3>
				<p className="font-montserrat text-sm font-normal leading-6 tracking-[0.25px] text-white md:text-base md:leading-6">
					{description}
				</p>

				<dl className="mt-2 flex flex-col gap-3 md:flex-row md:gap-12">
					<div className="flex flex-col gap-1">
						<dt className="font-montserrat text-sm font-medium leading-5 tracking-[0.15px] text-white/60">
							{t.awardsPage.quantityLabel}
						</dt>
						<dd className="font-montserrat text-lg font-bold leading-6 text-[#FFEA9E]">
							{award.quantity.toString().padStart(2, "0")}{" "}
							<span className="font-normal text-white/80">{quantityUnit}</span>
						</dd>
					</div>

					<div className="flex flex-col gap-1">
						<dt className="font-montserrat text-sm font-medium leading-5 tracking-[0.15px] text-white/60">
							{t.awardsPage.valueLabel}
						</dt>
						<dd className="font-montserrat text-lg font-bold leading-6 text-[#FFEA9E]">
							{award.prizeValue}
							{prizeNote && (
								<span className="ml-1 font-normal text-white/80">
									{prizeNote}
								</span>
							)}
						</dd>
					</div>
				</dl>
			</div>
		</article>
	);
}
