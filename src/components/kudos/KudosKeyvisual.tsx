"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export function KudosKeyvisual() {
	const { t } = useLanguage();

	return (
		<section
			className="relative mt-20 h-[280px] w-full overflow-hidden md:h-[360px]"
			aria-label={t.kudosPage.bannerTitle}
		>
			<Image
				src="/assets/login/images/key-visual.png"
				alt=""
				fill
				priority
				sizes="100vw"
				className="object-cover object-center"
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(180deg, rgba(0,16,26,0.2) 0%, rgba(0,16,26,0.5) 50%, #00101A 100%)",
				}}
			/>
			<div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end gap-2 px-3 pb-10 sm:px-6 md:px-8 lg:px-36">
				<p className="font-montserrat text-xs font-bold uppercase tracking-[2px] text-[#FFEA9E] md:text-sm">
					{t.kudosPage.bannerSubtitle}
				</p>
				<h1 className="font-montserrat text-2xl font-bold leading-tight text-white md:text-4xl lg:text-[40px] lg:leading-[48px]">
					{t.kudosPage.bannerTitle}
				</h1>
			</div>
		</section>
	);
}
