import type { Translations } from "@/i18n/translations";

type AwardKey = "topTalent" | "topProject" | "topProjectLeader" | "bestManager" | "signatureCreator" | "mvp";

export interface Award {
	id: string;
	key: AwardKey;
	titleImagePath: string;
	href: string;
}

export function getAwardTitle(t: Translations["homepage"], key: AwardKey): string {
	return t[key].title;
}

export function getAwardDescription(t: Translations["homepage"], key: AwardKey): string {
	return t[key].description;
}

export const awardsData: Award[] = [
	{
		id: "top-talent",
		key: "topTalent",
		titleImagePath: "/assets/homepage/images/award-top-talent-title.png",
		href: "/awards-information#top-talent",
	},
	{
		id: "top-project",
		key: "topProject",
		titleImagePath: "/assets/homepage/images/award-top-project-title.png",
		href: "/awards-information#top-project",
	},
	{
		id: "top-project-leader",
		key: "topProjectLeader",
		titleImagePath: "/assets/homepage/images/award-top-project-leader-title.png",
		href: "/awards-information#top-project-leader",
	},
	{
		id: "best-manager",
		key: "bestManager",
		titleImagePath: "/assets/homepage/images/award-best-manager-title.png",
		href: "/awards-information#best-manager",
	},
	{
		id: "signature-2025-creator",
		key: "signatureCreator",
		titleImagePath: "/assets/homepage/images/award-signature-creator-title.png",
		href: "/awards-information#signature-2025-creator",
	},
	{
		id: "mvp",
		key: "mvp",
		titleImagePath: "/assets/homepage/images/award-mvp-title.png",
		href: "/awards-information#mvp",
	},
];
