"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { FooterNav } from "@/components/shared/FooterNav";

interface FooterProps {
	variant?: "minimal" | "full";
}

export function Footer({ variant = "minimal" }: FooterProps) {
	const { t } = useLanguage();

	if (variant === "full") {
		return (
			<footer className="w-full border-t border-divider">
				<div className="mx-auto flex w-full max-w-[1512px] flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-[90px]">
					<FooterNav />
					<p className="font-montserrat-alt text-sm font-bold leading-6 text-white md:text-base">
						{t.footer.copyright}
					</p>
				</div>
			</footer>
		);
	}

	return (
		<footer className="absolute bottom-0 left-0 right-0 z-20 flex w-full items-center justify-center border-t border-divider py-6">
			<p className="font-montserrat-alt text-sm font-bold leading-6 text-white md:text-base">
				{t.footer.copyright}
			</p>
		</footer>
	);
}
