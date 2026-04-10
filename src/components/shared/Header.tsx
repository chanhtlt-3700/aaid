import Image from "next/image";
import { LanguageSelector } from "@/components/shared/LanguageSelector";

export function Header() {
	return (
		<header className="absolute top-0 z-10 w-full" style={{ background: "rgba(11, 15, 18, 0.8)" }}>
			<div className="mx-auto flex w-full max-w-[1224px] items-center justify-between px-3 py-3 sm:px-6 md:px-8 xl:px-0">
				<Image
					src="/assets/login/logos/saa-logo.png"
					alt="SAA 2025"
					width={52}
					height={48}
					className="h-9 w-10 md:h-11 md:w-12 lg:h-12 lg:w-[52px]"
				/>
				<LanguageSelector />
			</div>
		</header>
	);
}
