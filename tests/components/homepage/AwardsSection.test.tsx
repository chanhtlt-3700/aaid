import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AwardsSection } from "@/components/homepage/AwardsSection";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

function renderAwards() {
	return render(
		<LanguageProvider>
			<AwardsSection />
		</LanguageProvider>,
	);
}

describe("AwardsSection", () => {
	it("renders section header with caption and title", () => {
		renderAwards();
		expect(screen.getByText("Sun* annual awards 2025")).toBeInTheDocument();
		expect(screen.getByText("Hệ thống giải thưởng")).toBeInTheDocument();
	});

	it("renders 6 award cards", () => {
		renderAwards();
		const articles = screen.getAllByRole("article");
		expect(articles).toHaveLength(6);
	});

	it("renders all award titles", () => {
		renderAwards();
		expect(screen.getByText("Top Talent")).toBeInTheDocument();
		expect(screen.getByText("Top Project")).toBeInTheDocument();
		expect(screen.getByText("Top Project Leader")).toBeInTheDocument();
		expect(screen.getByText("Best Manager")).toBeInTheDocument();
		expect(screen.getByText("Signature 2025 - Creator")).toBeInTheDocument();
		expect(screen.getByText("MVP (Most Valuable Person)")).toBeInTheDocument();
	});

	it("renders detail links for each card", () => {
		renderAwards();
		const detailLinks = screen.getAllByText("Chi tiết");
		expect(detailLinks).toHaveLength(6);
	});

	it("award cards link to correct award information pages", () => {
		renderAwards();
		const links = screen.getAllByRole("link");
		const awardLinks = links.filter((l) => l.getAttribute("href")?.includes("/awards-information#"));
		expect(awardLinks).toHaveLength(6);
		expect(awardLinks[0]).toHaveAttribute("href", "/awards-information#top-talent");
		expect(awardLinks[5]).toHaveAttribute("href", "/awards-information#mvp");
	});
});
