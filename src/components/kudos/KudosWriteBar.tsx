"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export function KudosWriteBar() {
	const { t } = useLanguage();
	const [showToast, setShowToast] = useState(false);

	const handleClick = () => {
		setShowToast(true);
		window.setTimeout(() => setShowToast(false), 2500);
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={handleClick}
				className="flex h-14 w-full items-center gap-3 rounded-full border border-[#2E3940] bg-white/5 px-6 text-left transition-colors hover:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-[#FFEA9E]"
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
						stroke="#FFEA9E"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span className="font-montserrat text-sm font-medium leading-6 tracking-[0.15px] text-white/60 md:text-base">
					{t.kudosPage.writePlaceholder}
				</span>
			</button>
			{showToast && (
				<p
					role="status"
					className="absolute left-0 top-full mt-2 rounded bg-[#00070C] px-3 py-2 font-montserrat text-xs text-[#FFEA9E]"
				>
					{t.kudosPage.writeComingSoon}
				</p>
			)}
		</div>
	);
}
