"use client";

import Image from "next/image";

export function HeaderLogo() {
	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="SAA 2025 - scroll to top"
			className="flex items-center rounded focus:outline-2 focus:outline-offset-2 focus:outline-[#FFEA9E]"
		>
			<Image
				src="/assets/login/logos/saa-logo.png"
				alt="SAA 2025"
				width={52}
				height={48}
				className="h-9 w-10 md:h-11 md:w-12 lg:h-12 lg:w-[52px]"
			/>
		</button>
	);
}
