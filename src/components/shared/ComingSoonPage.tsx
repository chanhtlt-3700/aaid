"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
	pageTitle?: string;
}

export function ComingSoonPage({ pageTitle }: Props) {
	const { t } = useLanguage();

	return (
		<main className="flex min-h-[calc(100vh-80px-80px)] items-center justify-center px-6 pt-32">
			<div
				className="flex flex-col items-center gap-6 text-center"
				style={{ animation: "fadeIn 300ms ease-out" }}
			>
				<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFEA9E]/10 text-3xl">
					🚧
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="font-montserrat text-3xl font-bold text-[#FFEA9E] md:text-4xl">
						{pageTitle ?? t.comingSoonPage.title}
					</h1>
					<p className="max-w-lg font-montserrat text-sm text-white/70 md:text-base">
						{t.comingSoonPage.description}
					</p>
				</div>
				<Link
					href="/dashboard"
					className="rounded-lg bg-[#FFEA9E] px-6 py-3 font-montserrat text-sm font-bold text-[#00101A] transition-colors hover:bg-[#fff8e1]"
				>
					{t.comingSoonPage.backToDashboard}
				</Link>
			</div>
		</main>
	);
}
