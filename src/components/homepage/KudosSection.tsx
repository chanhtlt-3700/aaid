"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export function KudosSection() {
	const { t } = useLanguage();

	return (
		<section className="relative mx-auto w-full max-w-[1224px] overflow-hidden px-3 sm:px-6 md:px-8 xl:px-0">
			<div className="relative flex min-h-[500px] flex-col items-start justify-center gap-6 py-16 md:flex-row md:items-center md:py-0">
				{/* Text content */}
				<div className="relative z-10 flex max-w-xl flex-col gap-4">
					<p className="font-montserrat text-xl font-bold leading-8 text-white md:text-2xl">
						{t.homepage.kudos.label}
					</p>
					<h2 className="font-montserrat text-3xl font-bold leading-tight text-[#FFEA9E] md:text-5xl md:leading-[64px] lg:text-[57px]" style={{ letterSpacing: "-0.25px" }}>
						{t.homepage.kudos.title}
					</h2>
					<p className="whitespace-pre-line font-montserrat text-sm font-bold leading-6 tracking-[0.5px] text-white md:text-base">
						{t.homepage.kudos.description}
					</p>
					<Link
						href="/sun-kudos"
						className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-[#FFEA9E] px-6 py-3 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] transition-colors hover:bg-[#fff8e1]"
					>
						{t.homepage.kudos.detailButton}
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
							<path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Link>
				</div>

				{/* Decorative image */}
				<div className="relative hidden h-[500px] flex-1 md:block">
					<Image
						src="/assets/homepage/images/kudos-bg.png"
						alt=""
						fill
						sizes="50vw"
						className="object-contain object-right"
					/>
					{/* KUDOS watermark */}
					<span className="absolute bottom-8 right-0 font-montserrat text-6xl font-bold leading-6 tracking-tighter text-[#DBD1C1] opacity-30 lg:text-[96px]">
						KUDOS
					</span>
				</div>
			</div>
		</section>
	);
}
