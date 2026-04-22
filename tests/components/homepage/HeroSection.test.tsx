import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "@/components/homepage/HeroSection";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

function renderHero() {
	return render(
		<LanguageProvider>
			<HeroSection />
		</LanguageProvider>,
	);
}

describe("HeroSection", () => {
	it("renders ROOT FURTHER logo", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderHero();
		expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
	});

	it("renders countdown timer", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderHero();
		expect(screen.getByRole("timer")).toBeInTheDocument();
	});

	it("renders event info", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderHero();
		expect(screen.getByText(/Thời gian:/)).toBeInTheDocument();
		expect(screen.getByText(/Âu Cơ Art Center/)).toBeInTheDocument();
	});

	it("renders CTA buttons with correct links", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderHero();
		const aboutAwards = screen.getByText("Hệ thống giải thưởng");
		expect(aboutAwards.closest("a")).toHaveAttribute("href", "/awards-information");

		const aboutKudos = screen.getByText("Sun* Kudos");
		expect(aboutKudos.closest("a")).toHaveAttribute("href", "/sun-kudos");
	});

	it("renders Coming soon text when event is in the future", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderHero();
		expect(screen.getByText("Sắp diễn ra")).toBeInTheDocument();
	});
});
