"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { awardsDetailData } from "@/components/awards/awardsDetailData";

export function SidebarNav() {
	const { t } = useLanguage();
	const [activeSlug, setActiveSlug] = useState<string>(awardsDetailData[0].slug);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) {
					const id = visible[0].target.id;
					if (id) setActiveSlug(id);
				}
			},
			{
				rootMargin: "-120px 0px -60% 0px",
				threshold: [0, 0.25, 0.5, 0.75],
			},
		);

		awardsDetailData.forEach((award) => {
			const el = document.getElementById(award.slug);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<nav
			aria-label={t.awardsPage.pageTitle}
			className="sticky top-28 hidden w-60 flex-col gap-1 lg:flex"
		>
			{awardsDetailData.map((award) => {
				const isActive = award.slug === activeSlug;
				return (
					<a
						key={award.slug}
						href={`#${award.slug}`}
						className={`flex items-center gap-2 rounded px-4 py-3 font-montserrat text-base font-bold leading-6 tracking-[0.15px] transition-colors duration-150 ${
							isActive
								? "bg-[rgba(255,234,158,0.10)] text-[#FFEA9E] underline decoration-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
								: "text-white hover:bg-white/10"
						}`}
					>
						<span
							className={`h-2 w-2 rounded-full transition-colors ${
								isActive ? "bg-[#FFEA9E]" : "bg-transparent"
							}`}
							aria-hidden="true"
						/>
						{t.homepage[award.titleKey].title}
					</a>
				);
			})}
		</nav>
	);
}
