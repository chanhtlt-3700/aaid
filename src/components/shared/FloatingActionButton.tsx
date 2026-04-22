"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { WriteKudoModal } from "@/components/kudos/WriteKudoModal";
import { KudosRulesModal } from "@/components/kudos/KudosRulesModal";

export function FloatingActionButton() {
	const { t } = useLanguage();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isWriteOpen, setIsWriteOpen] = useState(false);
	const [isRulesOpen, setIsRulesOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isExpanded) return;
		function onClickOutside(event: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsExpanded(false);
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, [isExpanded]);

	const openWrite = useCallback(() => {
		setIsExpanded(false);
		setIsWriteOpen(true);
	}, []);

	const openRules = useCallback(() => {
		setIsExpanded(false);
		setIsRulesOpen(true);
	}, []);

	return (
		<>
			<div
				ref={wrapperRef}
				className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4 md:bottom-8 md:right-8"
			>
				{isExpanded && (
					<div className="flex flex-col items-end gap-3" style={{ animation: "fadeIn 180ms ease-out" }}>
						<button
							type="button"
							onClick={openRules}
							className="inline-flex h-14 min-w-[149px] items-center justify-center gap-2 rounded-xl bg-[#FFEA9E] px-5 font-montserrat text-base font-bold text-[#00101A] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] transition-colors hover:bg-[#fff8e1]"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path
									d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
							{t.fab.rules}
						</button>
						<button
							type="button"
							onClick={openWrite}
							className="inline-flex h-14 min-w-[149px] items-center justify-center gap-2 rounded-xl bg-[#FFEA9E] px-5 font-montserrat text-base font-bold text-[#00101A] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] transition-colors hover:bg-[#fff8e1]"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path
									d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							{t.fab.writeKudo}
						</button>
						<button
							type="button"
							onClick={() => setIsExpanded(false)}
							aria-label={t.fab.cancel}
							className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#dc2626]"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
							</svg>
						</button>
					</div>
				)}

				{!isExpanded && (
					<button
						type="button"
						onClick={() => setIsExpanded(true)}
						aria-label={t.fab.openMenu}
						aria-expanded={isExpanded}
						className="flex h-16 w-[106px] items-center justify-center gap-1 rounded-full bg-[#FFEA9E] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] transition-transform hover:scale-105 focus:outline-2 focus:outline-offset-2 focus:outline-white"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
								stroke="#00101A"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="font-montserrat text-lg font-bold text-[#00101A]/60" aria-hidden="true">
							/
						</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 16l-6.5 4.5L8 13.5 2 9h7.5L12 2z"
								fill="#00101A"
							/>
						</svg>
					</button>
				)}
			</div>

			<WriteKudoModal isOpen={isWriteOpen} onClose={() => setIsWriteOpen(false)} />
			<KudosRulesModal
				isOpen={isRulesOpen}
				onClose={() => setIsRulesOpen(false)}
				onWriteKudo={() => setIsWriteOpen(true)}
			/>
		</>
	);
}
