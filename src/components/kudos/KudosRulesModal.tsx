"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onWriteKudo: () => void;
}

export function KudosRulesModal({ isOpen, onClose, onWriteKudo }: Props) {
	const { t } = useLanguage();
	const titleId = useId();
	const backdropRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);

	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) return;
		const previous = document.activeElement as HTMLElement | null;
		dialogRef.current?.focus();
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") handleClose();
		}
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
			previous?.focus();
		};
	}, [isOpen, handleClose]);

	if (!isOpen) return null;

	return (
		<div
			ref={backdropRef}
			role="presentation"
			onMouseDown={(e) => {
				if (e.target === backdropRef.current) handleClose();
			}}
			className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-0 md:p-6"
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				className="relative flex max-h-screen w-full flex-col overflow-hidden rounded-none border-[#998C5F] bg-[#00070C] shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:max-h-[90vh] md:max-w-[720px] md:rounded-xl md:border"
			>
				<header className="flex items-center justify-between border-b border-[#2E3940] px-6 py-4">
					<h2
						id={titleId}
						className="font-montserrat text-xl font-bold leading-7 text-[#FFEA9E] md:text-2xl"
					>
						{t.kudosRulesModal.title}
					</h2>
					<button
						type="button"
						onClick={handleClose}
						aria-label={t.kudosRulesModal.close}
						className="rounded p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</header>

				<div className="flex-1 overflow-y-auto px-6 py-5">
					<p className="font-montserrat text-[15px] leading-[24px] tracking-[0.25px] text-white">
						{t.kudosRulesModal.intro}
					</p>

					<section className="mt-6 flex flex-col gap-3">
						<h3 className="font-montserrat text-sm font-bold uppercase tracking-[1.5px] text-[#FFEA9E]">
							{t.kudosRulesModal.rewardsTitle}
						</h3>
						<ul className="flex flex-col gap-2 pl-5">
							{t.kudosRulesModal.rewards.map((text) => (
								<li
									key={text}
									className="list-disc font-montserrat text-sm leading-6 text-white/90 marker:text-[#FFEA9E]"
								>
									{text}
								</li>
							))}
						</ul>
					</section>

					<section className="mt-6 flex flex-col gap-3">
						<h3 className="font-montserrat text-sm font-bold uppercase tracking-[1.5px] text-[#FFEA9E]">
							{t.kudosRulesModal.badgesTitle}
						</h3>
						<ul className="flex flex-wrap gap-3">
							{t.kudosRulesModal.badges.map((badge) => (
								<li
									key={badge.name}
									className="flex items-center gap-2 rounded-full border border-[#998C5F] bg-[#FFEA9E]/10 px-4 py-2 font-montserrat text-xs font-bold text-[#FFEA9E]"
								>
									<span className="text-base" aria-hidden="true">{badge.icon}</span>
									{badge.name}
								</li>
							))}
						</ul>
					</section>
				</div>

				<footer className="flex items-center justify-end gap-3 border-t border-[#2E3940] px-6 py-4">
					<button
						type="button"
						onClick={handleClose}
						className="inline-flex h-10 items-center justify-center rounded-lg border border-[#2E3940] px-5 font-montserrat text-sm font-bold text-white transition-colors hover:bg-white/10"
					>
						{t.kudosRulesModal.close}
					</button>
					<button
						type="button"
						onClick={() => {
							onClose();
							onWriteKudo();
						}}
						className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#FFEA9E] px-5 font-montserrat text-sm font-bold text-[#00101A] transition-colors hover:bg-[#fff8e1]"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						{t.kudosRulesModal.writeKudoCta}
					</button>
				</footer>
			</div>
		</div>
	);
}
