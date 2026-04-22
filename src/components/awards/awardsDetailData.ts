import type { Translations } from "@/i18n/translations";

export type AwardSlug =
	| "top-talent"
	| "top-project"
	| "top-project-leader"
	| "best-manager"
	| "signature-2025-creator"
	| "mvp";

type AwardDescriptionKey = keyof Translations["awardsPage"]["descriptions"];
type UnitKey = "unitIndividual" | "unitTeam" | "unitBoth";
type PrizeNoteKey = "prizeNoteEach" | "prizeNoteIndTeam";

export interface AwardDetail {
	slug: AwardSlug;
	titleKey: keyof Pick<
		Translations["homepage"],
		"topTalent" | "topProject" | "topProjectLeader" | "bestManager" | "signatureCreator" | "mvp"
	>;
	descriptionKey: AwardDescriptionKey;
	titleImagePath: string;
	quantity: number;
	quantityUnitKey: UnitKey;
	prizeValue: string;
	prizeNoteKey?: PrizeNoteKey;
}

export const awardsDetailData: AwardDetail[] = [
	{
		slug: "top-talent",
		titleKey: "topTalent",
		descriptionKey: "topTalent",
		titleImagePath: "/assets/homepage/images/award-top-talent-title.png",
		quantity: 10,
		quantityUnitKey: "unitIndividual",
		prizeValue: "7.000.000 VNĐ",
		prizeNoteKey: "prizeNoteEach",
	},
	{
		slug: "top-project",
		titleKey: "topProject",
		descriptionKey: "topProject",
		titleImagePath: "/assets/homepage/images/award-top-project-title.png",
		quantity: 2,
		quantityUnitKey: "unitTeam",
		prizeValue: "15.000.000 VNĐ",
		prizeNoteKey: "prizeNoteEach",
	},
	{
		slug: "top-project-leader",
		titleKey: "topProjectLeader",
		descriptionKey: "topProjectLeader",
		titleImagePath: "/assets/homepage/images/award-top-project-leader-title.png",
		quantity: 3,
		quantityUnitKey: "unitIndividual",
		prizeValue: "7.000.000 VNĐ",
		prizeNoteKey: "prizeNoteEach",
	},
	{
		slug: "best-manager",
		titleKey: "bestManager",
		descriptionKey: "bestManager",
		titleImagePath: "/assets/homepage/images/award-best-manager-title.png",
		quantity: 1,
		quantityUnitKey: "unitIndividual",
		prizeValue: "10.000.000 VNĐ",
	},
	{
		slug: "signature-2025-creator",
		titleKey: "signatureCreator",
		descriptionKey: "signatureCreator",
		titleImagePath: "/assets/homepage/images/award-signature-creator-title.png",
		quantity: 1,
		quantityUnitKey: "unitBoth",
		prizeValue: "5.000.000 / 8.000.000 VNĐ",
		prizeNoteKey: "prizeNoteIndTeam",
	},
	{
		slug: "mvp",
		titleKey: "mvp",
		descriptionKey: "mvp",
		titleImagePath: "/assets/homepage/images/award-mvp-title.png",
		quantity: 1,
		quantityUnitKey: "unitIndividual",
		prizeValue: "15.000.000 VNĐ",
	},
];
