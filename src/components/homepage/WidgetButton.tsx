"use client";

import Image from "next/image";

export function WidgetButton() {
	return (
		<button
			type="button"
			aria-label="Quick actions"
			onClick={() => {
				// Stub: quick action menu will be implemented in a separate feature
			}}
			className="fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full bg-[#FFEA9E] px-4 py-4 transition-transform hover:scale-105 [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287]"
		>
			<Image
				src="/assets/homepage/icons/widget-pencil.svg"
				alt=""
				width={24}
				height={24}
			/>
			<span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">/</span>
			<Image
				src="/assets/homepage/icons/widget-saa.svg"
				alt=""
				width={24}
				height={24}
			/>
		</button>
	);
}
