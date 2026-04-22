import { AwardDetailCard } from "@/components/awards/AwardDetailCard";
import { SidebarNav } from "@/components/awards/SidebarNav";
import { awardsDetailData } from "@/components/awards/awardsDetailData";

export function AwardsContent() {
	return (
		<div className="mx-auto flex w-full max-w-[1440px] gap-16 px-3 pt-20 sm:px-6 md:px-8 lg:px-36">
			<aside className="hidden lg:block">
				<SidebarNav />
			</aside>
			<div className="flex-1">
				{awardsDetailData.map((award) => (
					<AwardDetailCard key={award.slug} award={award} />
				))}
			</div>
		</div>
	);
}
