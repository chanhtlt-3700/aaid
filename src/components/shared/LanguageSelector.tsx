"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import type { LanguageCode } from "@/i18n/translations";

interface Language {
	code: LanguageCode;
	flag: string;
	alt: string;
}

const languages: Language[] = [
	{ code: "VN", flag: "/assets/login/icons/vn-flag.svg", alt: "Vietnam flag" },
	{ code: "EN", flag: "/assets/login/icons/en-flag.svg", alt: "English flag" },
];

export function LanguageSelector() {
	const { language: currentLanguage, setLanguage } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
			const currentIndex = languages.findIndex((l) => l.code === currentLanguage);
			optionRefs.current[currentIndex]?.focus();
		}
	}, [isOpen, currentLanguage]);

	const toggleDropdown = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const selectLanguage = useCallback(
		(code: LanguageCode) => {
			setLanguage(code);
			setIsOpen(false);
			triggerRef.current?.focus();
		},
		[setLanguage],
	);

	const handleTriggerKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (!isOpen) setIsOpen(true);
			}
		},
		[isOpen],
	);

	const handleDropdownKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			const currentIndex = languages.findIndex((l) => l.code === currentLanguage);

			switch (e.key) {
				case "Escape":
					e.preventDefault();
					setIsOpen(false);
					triggerRef.current?.focus();
					break;
				case "ArrowDown": {
					e.preventDefault();
					const nextIndex = (currentIndex + 1) % languages.length;
					optionRefs.current[nextIndex]?.focus();
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
					optionRefs.current[prevIndex]?.focus();
					break;
				}
				case "Tab":
					setIsOpen(false);
					break;
			}
		},
		[currentLanguage],
	);

	const currentLang = languages.find((l) => l.code === currentLanguage)!;

	return (
		<div ref={wrapperRef} className="relative">
			<button
				ref={triggerRef}
				type="button"
				aria-label="Select language"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				onClick={toggleDropdown}
				onKeyDown={handleTriggerKeyDown}
				className="flex items-center gap-0.5 rounded px-4 py-4 transition-colors duration-150 hover:cursor-pointer hover:bg-white/10"
			>
				<span className="flex h-6 w-6 items-center justify-center">
					<Image src={currentLang.flag} alt={currentLang.alt} width={20} height={15} />
				</span>
				<span className="hidden font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white min-[480px]:inline">
					{currentLanguage}
				</span>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
					className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
				>
					<path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" />
				</svg>
			</button>

			{isOpen && (
				<div
					role="listbox"
					aria-label="Language options"
					onKeyDown={handleDropdownKeyDown}
					className="absolute right-0 top-full z-50 flex flex-col rounded-lg border border-[#998C5F] bg-[#00070C] p-1.5 animate-in fade-in"
					style={{
						animation: "dropdown-in 150ms ease-out",
					}}
				>
					{languages.map((lang, index) => {
						const isSelected = lang.code === currentLanguage;
						return (
							<button
								key={lang.code}
								ref={(el) => {
									optionRefs.current[index] = el;
								}}
								role="option"
								aria-selected={isSelected}
								type="button"
								onClick={() => selectLanguage(lang.code)}
								className={`flex items-center gap-1 rounded px-4 py-4 transition-colors duration-150 hover:cursor-pointer ${
									isSelected
										? "rounded-sm bg-[rgba(255,234,158,0.2)] hover:bg-[rgba(255,234,158,0.3)]"
										: "hover:bg-white/10"
								}`}
							>
								<span className="flex h-6 w-6 items-center justify-center">
									<Image src={lang.flag} alt={lang.alt} width={20} height={15} />
								</span>
								<span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white">
									{lang.code}
								</span>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
