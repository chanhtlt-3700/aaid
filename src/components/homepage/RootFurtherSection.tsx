"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export function RootFurtherSection() {
	const { t } = useLanguage();

	return (
		<section className="mx-auto w-full max-w-[1224px] px-3 sm:px-6 md:px-8 xl:px-0">
			<div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-lg border border-white/5 bg-[#00101A]/80 px-6 py-16 backdrop-blur-sm md:px-[104px] md:py-[120px]">
				{/* ROOT FURTHER small logo */}
				<Image
					src="/assets/homepage/images/root-further-logo.png"
					alt="ROOT FURTHER"
					width={290}
					height={134}
					className="h-auto w-48 object-contain md:w-[290px]"
				/>

				{/* Content */}
				<div className="flex max-w-[1152px] flex-col gap-8">
					<p className="whitespace-pre-line font-montserrat text-sm font-bold leading-7 text-white md:text-base md:leading-8">
						{t.homepage.rootFurther.paragraph1}
					</p>

					{/* Quote */}
					<blockquote className="whitespace-pre-line text-center font-montserrat text-base font-bold italic leading-8 text-white md:text-xl">
						{t.homepage.rootFurther.quote}
					</blockquote>

					<p className="whitespace-pre-line font-montserrat text-sm font-bold leading-7 text-white md:text-base md:leading-8">
						{t.homepage.rootFurther.paragraph2}
					</p>
				</div>
			</div>
		</section>
	);
}
