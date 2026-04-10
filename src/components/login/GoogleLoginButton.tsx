"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/libs/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

export function GoogleLoginButton() {
	const { t } = useLanguage();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const errorTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		return () => {
			if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
		};
	}, []);

	const handleLogin = async () => {
		if (isLoading) return;

		setIsLoading(true);
		setError(null);

		const supabase = createClient();
		const { error: oauthError } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});

		if (oauthError) {
			setError(t.login.error);
			setIsLoading(false);
			errorTimerRef.current = setTimeout(() => setError(null), 5000);
		}
	};

	return (
		<div>
			<button
				type="button"
				onClick={handleLogin}
				disabled={isLoading}
				aria-label={t.login.buttonAriaLabel}
				className="flex h-15 min-w-[297px] items-center justify-center gap-2 rounded-lg bg-btn-login-bg px-6 py-4 font-montserrat text-base font-normal text-btn-login-text transition-colors hover:bg-[#fff8e1] focus:outline-2 focus:outline-offset-2 focus:outline-btn-login-bg disabled:cursor-not-allowed disabled:opacity-50"
			>
				<span>{t.login.button}</span>
				{isLoading ? (
					<svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
						<path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
					</svg>
				) : (
					<Image
						src="/assets/login/icons/google.svg"
						alt=""
						width={24}
						height={24}
					/>
				)}
			</button>
			{error && (
				<p className="mt-2 text-sm text-red-400" role="alert">
					{error}
				</p>
			)}
		</div>
	);
}
