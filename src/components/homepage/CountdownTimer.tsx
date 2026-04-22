"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SevenSegmentDigit } from "@/components/homepage/SevenSegmentDigit";

const DEFAULT_EVENT_DATE = "2025-12-26T00:00:00+07:00";

interface CountdownTimerProps {
	onExpired?: (expired: boolean) => void;
	targetIso?: string;
}

function getTargetDate(override?: string): Date {
	const source = override ?? process.env.NEXT_PUBLIC_EVENT_DATE;
	if (source) {
		const parsed = new Date(source);
		if (!isNaN(parsed.getTime())) return parsed;
		if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
			console.warn(`Invalid countdown target "${source}". Falling back to default.`);
		}
	}
	return new Date(DEFAULT_EVENT_DATE);
}

function calculateRemaining(target: Date) {
	const now = Date.now();
	const diff = target.getTime() - now;

	if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isExpired: true };

	const totalMinutes = Math.floor(diff / (1000 * 60));
	const days = Math.floor(totalMinutes / (60 * 24));
	const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
	const minutes = totalMinutes % 60;

	return { days, hours, minutes, isExpired: false };
}

function pad(n: number): string {
	return n.toString().padStart(2, "0");
}

export function CountdownTimer({ onExpired, targetIso }: CountdownTimerProps) {
	const { t } = useLanguage();
	const [targetDate] = useState(() => getTargetDate(targetIso));
	const [remaining, setRemaining] = useState(() => calculateRemaining(targetDate));

	const updateCountdown = useCallback(() => {
		const next = calculateRemaining(targetDate);
		setRemaining(next);
		return next.isExpired;
	}, [targetDate]);

	useEffect(() => {
		onExpired?.(remaining.isExpired);
	}, [remaining.isExpired, onExpired]);

	useEffect(() => {
		if (remaining.isExpired) return;

		const interval = setInterval(() => {
			const expired = updateCountdown();
			if (expired) clearInterval(interval);
		}, 60_000);

		return () => clearInterval(interval);
	}, [remaining.isExpired, updateCountdown]);

	const units = [
		{ value: remaining.days, label: t.homepage.countdown.days },
		{ value: remaining.hours, label: t.homepage.countdown.hours },
		{ value: remaining.minutes, label: t.homepage.countdown.minutes },
	];

	return (
		<div role="timer" aria-live="polite" className="flex items-center gap-4 md:gap-10">
			{units.map((unit) => {
				const digits = pad(unit.value);
				return (
					<div key={unit.label} className="flex flex-col items-center gap-2 md:gap-3.5">
						{/* Digit pair in single dark box */}
						<div
							className="flex items-center justify-center gap-2 rounded-lg bg-[#111C27] px-3 py-3 md:gap-3 md:px-4 md:py-4"
							aria-label={`${unit.value} ${unit.label}`}
						>
							<SevenSegmentDigit digit={digits[0]} size={44} />
							<SevenSegmentDigit digit={digits[1]} size={44} />
						</div>
						<span className="font-montserrat text-xs font-bold uppercase tracking-[0.1em] text-white md:text-base">
							{unit.label}
						</span>
					</div>
				);
			})}
		</div>
	);
}
