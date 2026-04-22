"use client";

import { useState } from "react";
import { Avatar } from "@/components/kudos/Avatar";
import type { Kudo, KudoUser } from "@/components/kudos/mockKudos";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
	kudo: Kudo;
	variant?: "feed" | "highlight";
}

function formatTimestamp(iso: string): string {
	const date = new Date(iso);
	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${pad(date.getHours())}:${pad(date.getMinutes())} - ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function UserChip({ user, anonymousLabel }: { user: KudoUser | null; anonymousLabel: string }) {
	if (!user) {
		return (
			<span className="inline-flex items-center gap-2">
				<Avatar initials="?" size="md" />
				<span className="flex flex-col">
					<span className="font-montserrat text-sm font-bold leading-5 tracking-[0.15px] text-white">
						{anonymousLabel}
					</span>
				</span>
			</span>
		);
	}
	return (
		<span className="inline-flex items-center gap-2">
			<Avatar initials={user.initials} size="md" />
			<span className="flex flex-col">
				<span className="font-montserrat text-sm font-bold leading-5 tracking-[0.15px] text-white">
					{user.name}
				</span>
				<span className="font-montserrat text-xs font-medium leading-4 text-white/60">
					{user.department}
				</span>
			</span>
		</span>
	);
}

export function KudoCard({ kudo, variant = "feed" }: Props) {
	const { t } = useLanguage();
	const [isLiked, setIsLiked] = useState(false);
	const [heartCount, setHeartCount] = useState(kudo.heartCount);
	const [copyFeedback, setCopyFeedback] = useState(false);

	const toggleHeart = () => {
		setIsLiked((prev) => {
			const next = !prev;
			setHeartCount((c) => c + (next ? 1 : -1));
			return next;
		});
	};

	const handleCopy = async () => {
		const url = `${window.location.origin}/sun-kudos#${kudo.id}`;
		try {
			await navigator.clipboard.writeText(url);
			setCopyFeedback(true);
			window.setTimeout(() => setCopyFeedback(false), 2000);
		} catch {
			setCopyFeedback(true);
			window.setTimeout(() => setCopyFeedback(false), 2000);
		}
	};

	return (
		<article
			id={kudo.id}
			className={`flex scroll-mt-28 flex-col gap-4 rounded-xl border border-[#2E3940] bg-white/5 p-5 transition-colors ${
				variant === "highlight" ? "ring-1 ring-[#FFEA9E]/30" : ""
			} ${kudo.isHighlighted && variant === "feed" ? "border-[#FFEA9E]/40" : ""}`}
		>
			<header className="flex flex-wrap items-center gap-3 text-sm">
				<UserChip user={kudo.sender} anonymousLabel={kudo.anonymousName ?? t.kudosPage.anonymous} />
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-1 text-white/50">
					<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				<div className="flex flex-wrap items-center gap-2">
					{kudo.recipients.map((r) => (
						<UserChip key={r.id} user={r} anonymousLabel="" />
					))}
				</div>
				<time className="ml-auto font-montserrat text-xs text-white/50">
					{formatTimestamp(kudo.createdAt)}
				</time>
			</header>

			<p className="font-montserrat text-[15px] font-normal leading-[22px] tracking-[0.15px] text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
				{kudo.content}
			</p>

			<ul className="flex flex-wrap gap-2">
				{kudo.hashtags.map((tag) => (
					<li
						key={tag}
						className="rounded bg-[#FFEA9E]/10 px-2 py-1 font-montserrat text-xs font-bold text-[#FFEA9E]"
					>
						#{tag}
					</li>
				))}
			</ul>

			<footer className="flex items-center justify-between border-t border-[#2E3940] pt-3">
				<button
					type="button"
					onClick={toggleHeart}
					aria-pressed={isLiked}
					className="flex items-center gap-2 rounded px-2 py-1 font-montserrat text-sm font-bold text-white transition-colors hover:bg-white/10"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill={isLiked ? "#FF6B6B" : "none"}
						aria-hidden="true"
					>
						<path
							d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z"
							stroke={isLiked ? "#FF6B6B" : "rgba(255,255,255,0.6)"}
							strokeWidth="2"
							strokeLinejoin="round"
						/>
					</svg>
					<span>{heartCount}</span>
				</button>

				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleCopy}
						className="relative inline-flex items-center gap-1 rounded px-2 py-1 font-montserrat text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M10 13a5 5 0 007.07 0l3-3a5 5 0 10-7.07-7.07l-1 1M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 107.07 7.07l1-1"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						{copyFeedback ? t.kudosPage.linkCopied : t.kudosPage.copyLink}
					</button>
					<button
						type="button"
						onClick={() => {
							// MVP: stub — future navigate to /kudo/[id]
						}}
						className="font-montserrat text-xs font-bold text-[#FFEA9E] transition-colors hover:underline"
					>
						{t.kudosPage.viewDetail}
					</button>
				</div>
			</footer>
		</article>
	);
}
