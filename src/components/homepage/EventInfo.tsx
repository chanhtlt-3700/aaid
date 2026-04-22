"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function EventInfo() {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-2">
			<p>
				<span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white">
					{t.homepage.eventInfo.dateLabel}{" "}
				</span>
				<span className="font-montserrat text-xl font-bold leading-8 text-[#FFEA9E] md:text-2xl">
					{t.homepage.eventInfo.dateValue}
				</span>
			</p>
			<p>
				<span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white">
					{t.homepage.eventInfo.venueLabel}{" "}
				</span>
				<span className="font-montserrat text-xl font-bold leading-8 text-[#FFEA9E] md:text-2xl">
					{t.homepage.eventInfo.venueValue}
				</span>
			</p>
			<p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white">
				{t.homepage.eventInfo.livestreamNote}
			</p>
		</div>
	);
}
