import Link from "next/link";
import Image from "next/image";
import type { Award } from "@/components/homepage/awardsData";
import { getAwardTitle, getAwardDescription } from "@/components/homepage/awardsData";
import type { Translations } from "@/i18n/translations";

interface AwardCardProps {
	award: Award;
	homepage: Translations["homepage"];
}

export function AwardCard({ award, homepage }: AwardCardProps) {
	const title = getAwardTitle(homepage, award.key);
	const description = getAwardDescription(homepage, award.key);

	return (
		<article>
			<Link
				href={award.href}
				className="group flex flex-col gap-6 outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00101A]"
			>
				{/* Award image: ring glow bg + title overlay */}
				<div className="relative flex aspect-square w-full items-center justify-center overflow-hidden mix-blend-screen [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] transition-transform duration-200 group-hover:scale-[1.02]">
					<Image
						src="/assets/homepage/images/award-ring-glow.png"
						alt=""
						fill
						sizes="(max-width: 768px) 50vw, 336px"
						className="object-cover"
					/>
					<Image
						src={award.titleImagePath}
						alt={title}
						width={232}
						height={35}
						className="relative z-10 h-auto w-2/3 object-contain"
					/>
				</div>

				{/* Text content */}
				<div className="flex flex-col gap-1">
					<h3 className="font-montserrat text-xl font-normal leading-8 text-[#FFEA9E] md:text-2xl">
						{title}
					</h3>
					<p className="line-clamp-2 font-montserrat text-sm font-normal leading-6 tracking-[0.5px] text-white md:text-base">
						{description}
					</p>
					<span className="mt-2 inline-flex items-center gap-1 font-montserrat text-sm font-medium leading-6 tracking-[0.15px] text-white md:text-base">
						{homepage.awards.detailLink}
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
							<path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
				</div>
			</Link>
		</article>
	);
}
