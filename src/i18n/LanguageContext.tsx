"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type LanguageCode, type Translations } from "@/i18n/translations";

interface LanguageContextValue {
	language: LanguageCode;
	setLanguage: (code: LanguageCode) => void;
	t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getCookie(name: string): string | undefined {
	if (typeof document === "undefined") return undefined;
	const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string) {
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<LanguageCode>("VN");

	useEffect(() => {
		const saved = getCookie("lang");
		if (saved === "VN" || saved === "EN") {
			setLanguageState(saved);
		}
	}, []);

	const setLanguage = useCallback((code: LanguageCode) => {
		setLanguageState(code);
		setCookie("lang", code);
	}, []);

	const t = translations[language];

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
