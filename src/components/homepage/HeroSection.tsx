"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { CountdownTimer } from "@/components/homepage/CountdownTimer";
import { EventInfo } from "@/components/homepage/EventInfo";
import { CTAButtons } from "@/components/homepage/CTAButtons";

export function HeroSection() {
	const { t } = useLanguage();
	const [isExpired, setIsExpired] = useState(false);

	return (
		<section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
			{/* Background key visual */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/assets/login/images/key-visual.png"
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-right-top"
				/>
			</div>

			{/* Gradient: left to right (dark on left, transparent on right) */}
			<div
				className="absolute inset-0 z-[1]"
				style={{
					background: "linear-gradient(90deg, #00101A 0%, #00101A 25%, rgba(0, 16, 26, 0) 60%)",
				}}
			/>

			{/* Gradient: bottom to top */}
			<div
				className="absolute inset-x-0 bottom-0 z-[1] h-[400px]"
				style={{
					background: "linear-gradient(0deg, #00101A 0%, rgba(0, 19, 32, 0) 70%)",
				}}
			/>

			{/* Content */}
			<div className="relative z-10 mx-auto flex w-full max-w-[1224px] flex-col gap-10 px-3 pb-24 pt-32 sm:px-6 md:px-8 md:pt-40 xl:px-0">
				{/* ROOT FURTHER logo */}
				<div className="relative">
					<Image
						src="/assets/login/logos/root-further.png"
						alt="ROOT FURTHER"
						width={451}
						height={200}
						priority
						className="h-full max-h-30 w-auto object-contain object-left sm:max-h-40 lg:max-h-[unset] lg:w-[451px]"
					/>
				</div>

				{/* Countdown + Coming Soon */}
				<div className="flex flex-col gap-4">
					{!isExpired && (
						<p className="font-montserrat text-xl font-bold leading-8 text-white md:text-2xl">
							{t.homepage.hero.comingSoon}
						</p>
					)}
					<CountdownTimer onExpired={setIsExpired} />
				</div>

				{/* Event Info */}
				<EventInfo />

				{/* CTA Buttons */}
				<CTAButtons />
			</div>
		</section>
	);
}
