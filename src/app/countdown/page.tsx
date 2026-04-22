"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CountdownTimer } from "@/components/homepage/CountdownTimer";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CountdownPage() {
	const { t } = useLanguage();
	const [isExpired, setIsExpired] = useState(false);
	const targetIso = process.env.NEXT_PUBLIC_SYSTEM_OPEN_AT;

	const handleExpired = useCallback((expired: boolean) => {
		setIsExpired(expired);
		if (expired && typeof window !== "undefined") {
			// Give the user a moment to see the "Opened" state before redirecting.
			window.setTimeout(() => {
				window.location.href = "/";
			}, 1500);
		}
	}, []);

	return (
		<div className="relative h-screen w-screen overflow-hidden bg-bg-primary">
			<div className="absolute inset-0 z-0">
				<Image
					src="/assets/login/images/key-visual.png"
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-center"
				/>
			</div>
			<div
				className="absolute inset-0 z-[1]"
				style={{
					background:
						"linear-gradient(180deg, rgba(0,16,26,0.4) 0%, rgba(0,16,26,0.7) 60%, #00101A 100%)",
				}}
			/>

			<div className="relative z-10 flex h-screen flex-col">
				<Header />

				<main className="flex flex-1 flex-col items-center justify-center gap-10 px-4">
					<Image
						src="/assets/login/logos/root-further.png"
						alt="ROOT FURTHER"
						width={360}
						height={160}
						priority
						className="h-24 w-auto object-contain md:h-32"
					/>

					<div className="flex flex-col items-center gap-3 text-center">
						<p className="font-montserrat text-sm font-medium uppercase tracking-[3px] text-white/70 md:text-base">
							{t.countdownPage.subtitle}
						</p>
						<h1 className="font-montserrat text-3xl font-bold uppercase tracking-[2px] text-[#FFEA9E] md:text-[40px]">
							{isExpired ? t.countdownPage.openCta : t.countdownPage.title}
						</h1>
					</div>

					{!isExpired && (
						<CountdownTimer onExpired={handleExpired} targetIso={targetIso} />
					)}

					<p className="font-montserrat text-sm font-medium text-white/60 md:text-base">
						{t.countdownPage.eventLabel}
					</p>

					{isExpired && (
						<Link
							href="/"
							className="rounded-lg bg-[#FFEA9E] px-6 py-3 font-montserrat text-base font-bold text-[#00101A] transition-colors hover:bg-[#fff8e1]"
						>
							{t.countdownPage.openCta}
						</Link>
					)}
				</main>

				<Footer />
			</div>
		</div>
	);
}
