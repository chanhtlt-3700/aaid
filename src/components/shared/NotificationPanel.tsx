"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

type NotificationType = "kudo" | "heart" | "gift" | "system";

interface Notification {
	id: string;
	type: NotificationType;
	minutesAgo: number;
	isRead: boolean;
}

const seedNotifications: Notification[] = [
	{ id: "n1", type: "kudo", minutesAgo: 3, isRead: false },
	{ id: "n2", type: "heart", minutesAgo: 25, isRead: false },
	{ id: "n3", type: "gift", minutesAgo: 120, isRead: false },
	{ id: "n4", type: "system", minutesAgo: 60 * 20, isRead: true },
];

const iconMap: Record<NotificationType, string> = {
	kudo: "💬",
	heart: "❤️",
	gift: "🎁",
	system: "📣",
};

function formatRelativeTime(
	minutesAgo: number,
	labels: { timeJustNow: string; timeMinutes: string; timeHours: string; timeDays: string },
): string {
	if (minutesAgo < 1) return labels.timeJustNow;
	if (minutesAgo < 60) return labels.timeMinutes.replace("{n}", String(minutesAgo));
	const hours = Math.floor(minutesAgo / 60);
	if (hours < 24) return labels.timeHours.replace("{n}", String(hours));
	const days = Math.floor(hours / 24);
	return labels.timeDays.replace("{n}", String(days));
}

export function NotificationPanel() {
	const { t } = useLanguage();
	const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

	useEffect(() => {
		if (!isOpen) return;
		function onClickOutside(e: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setIsOpen(false);
				triggerRef.current?.focus();
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClickOutside);
			document.removeEventListener("keydown", onKey);
		};
	}, [isOpen]);

	const markRead = useCallback((id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
		);
	}, []);

	const markAllRead = useCallback(() => {
		setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
	}, []);

	return (
		<div ref={wrapperRef} className="relative">
			<button
				ref={triggerRef}
				type="button"
				aria-label={t.notificationPanel.triggerAriaLabel}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				onClick={() => setIsOpen((p) => !p)}
				className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-[#FFEA9E]"
			>
				<Image
					src="/assets/homepage/icons/notification-bell.svg"
					alt=""
					width={24}
					height={24}
				/>
				{unreadCount > 0 && (
					<span
						aria-hidden="true"
						className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EF4444] px-1 font-montserrat text-[11px] font-bold leading-none text-white"
					>
						{unreadCount}
					</span>
				)}
			</button>

			{isOpen && (
				<div
					role="menu"
					aria-label={t.notificationPanel.panelTitle}
					className="absolute right-0 top-12 z-50 flex max-h-[480px] w-[320px] flex-col rounded-xl border border-[#998C5F] bg-[#00070C] shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:w-[380px]"
					style={{ animation: "dropdown-in 150ms ease-out" }}
				>
					<header className="flex items-center justify-between border-b border-[#2E3940] px-4 py-3">
						<h3 className="font-montserrat text-base font-bold text-[#FFEA9E]">
							{t.notificationPanel.panelTitle}
						</h3>
						<button
							type="button"
							onClick={markAllRead}
							disabled={unreadCount === 0}
							className="font-montserrat text-xs font-bold text-[#FFEA9E] transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-40"
						>
							{t.notificationPanel.markAllRead}
						</button>
					</header>

					<div className="flex-1 overflow-y-auto">
						{notifications.length === 0 ? (
							<p className="px-4 py-8 text-center font-montserrat text-sm text-white/60">
								{t.notificationPanel.empty}
							</p>
						) : (
							<ul>
								{notifications.map((n) => {
									const title = t.notificationPanel.sampleTitles[n.type];
									const message = t.notificationPanel.sampleMessages[n.type];
									const time = formatRelativeTime(n.minutesAgo, {
										timeJustNow: t.notificationPanel.timeJustNow,
										timeMinutes: t.notificationPanel.timeMinutes,
										timeHours: t.notificationPanel.timeHours,
										timeDays: t.notificationPanel.timeDays,
									});
									return (
										<li key={n.id}>
											<button
												type="button"
												onClick={() => markRead(n.id)}
												className={`flex w-full items-start gap-3 border-b border-[#2E3940] px-4 py-3 text-left transition-colors hover:bg-white/5 ${
													n.isRead ? "" : "bg-[#FFEA9E]/[0.06]"
												}`}
											>
												<span
													className="mt-1 text-lg"
													aria-hidden="true"
												>
													{iconMap[n.type]}
												</span>
												<span className="flex flex-1 flex-col gap-1">
													<span className="flex items-center gap-2">
														<span className="font-montserrat text-sm font-bold text-white">
															{title}
														</span>
														{!n.isRead && (
															<span
																aria-hidden="true"
																className="h-2 w-2 rounded-full bg-[#FFEA9E]"
															/>
														)}
													</span>
													<span className="line-clamp-2 font-montserrat text-xs text-white/80">
														{message}
													</span>
													<span className="font-montserrat text-[11px] text-white/50">
														{time}
													</span>
												</span>
											</button>
										</li>
									);
								})}
							</ul>
						)}
					</div>

					<footer className="border-t border-[#2E3940] px-4 py-2 text-center">
						<button
							type="button"
							disabled
							className="font-montserrat text-xs font-bold text-[#FFEA9E]/60 disabled:cursor-not-allowed"
							title="Coming soon"
						>
							{t.notificationPanel.viewAll}
						</button>
					</footer>
				</div>
			)}
		</div>
	);
}
