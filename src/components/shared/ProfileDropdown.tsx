"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/libs/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

export function ProfileDropdown() {
	const { t } = useLanguage();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			itemRefs.current[0]?.focus();
		}
	}, [isOpen]);

	const toggleDropdown = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
		triggerRef.current?.focus();
	}, []);

	const handleLogout = useCallback(async () => {
		if (isSigningOut) return;
		setIsSigningOut(true);
		const supabase = createClient();
		await supabase.auth.signOut();
		setIsOpen(false);
		router.push("/");
		router.refresh();
	}, [isSigningOut, router]);

	const handleTriggerKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (!isOpen) setIsOpen(true);
			}
		},
		[isOpen],
	);

	const handleMenuKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			const items = itemRefs.current.filter((el): el is NonNullable<typeof el> => el != null);
			const currentIndex = items.findIndex((el) => el === document.activeElement);

			switch (e.key) {
				case "Escape":
					e.preventDefault();
					closeDropdown();
					break;
				case "ArrowDown": {
					e.preventDefault();
					const next = (currentIndex + 1) % items.length;
					items[next]?.focus();
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					const prev = (currentIndex - 1 + items.length) % items.length;
					items[prev]?.focus();
					break;
				}
				case "Tab":
					setIsOpen(false);
					break;
			}
		},
		[closeDropdown],
	);

	return (
		<div ref={wrapperRef} className="relative">
			<button
				ref={triggerRef}
				type="button"
				aria-label={t.profileDropdown.triggerAriaLabel}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				onClick={toggleDropdown}
				onKeyDown={handleTriggerKeyDown}
				className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:cursor-pointer hover:bg-white/30 focus:outline-2 focus:outline-offset-2 focus:outline-[#FFEA9E]"
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<circle cx="12" cy="8" r="4" fill="white" />
					<path d="M4 20c0-4 4-7 8-7s8 3 8 7" fill="white" />
				</svg>
			</button>

			{isOpen && (
				<div
					role="menu"
					aria-label={t.profileDropdown.menuAriaLabel}
					onKeyDown={handleMenuKeyDown}
					className="absolute right-0 top-12 z-50 flex min-w-[132px] flex-col rounded-lg border border-[#998C5F] bg-[#00070C] p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
					style={{ animation: "dropdown-in 150ms ease-out" }}
				>
					<Link
						ref={(el) => {
							itemRefs.current[0] = el;
						}}
						role="menuitem"
						href="/profile"
						onClick={() => setIsOpen(false)}
						className="group flex h-14 min-w-[120px] items-center justify-start gap-1 rounded px-4 py-4 transition-colors duration-150 hover:cursor-pointer hover:bg-[rgba(255,234,158,0.1)] focus:bg-[rgba(255,234,158,0.1)] focus:outline-none"
					>
						<span
							className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white group-hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] group-focus:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
						>
							{t.profileDropdown.profile}
						</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<circle cx="12" cy="8" r="4" fill="white" />
							<path d="M4 20c0-4 4-7 8-7s8 3 8 7" fill="white" />
						</svg>
					</Link>

					<button
						ref={(el) => {
							itemRefs.current[1] = el;
						}}
						role="menuitem"
						type="button"
						onClick={handleLogout}
						disabled={isSigningOut}
						className="group flex h-14 min-w-[120px] items-center justify-start gap-1 rounded px-4 py-4 transition-colors duration-150 hover:cursor-pointer hover:bg-[rgba(255,234,158,0.1)] focus:bg-[rgba(255,234,158,0.1)] focus:outline-none disabled:cursor-wait disabled:opacity-60"
					>
						<span
							className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white group-hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] group-focus:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
						>
							{isSigningOut ? t.profileDropdown.loggingOut : t.profileDropdown.logout}
						</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M9 6l6 6-6 6"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
}
