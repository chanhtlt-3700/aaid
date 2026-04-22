import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KudosSection } from "@/components/homepage/KudosSection";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

function renderKudos() {
	return render(
		<LanguageProvider>
			<KudosSection />
		</LanguageProvider>,
	);
}

describe("KudosSection", () => {
	it("renders label and title", () => {
		renderKudos();
		expect(screen.getByText("Phong trào ghi nhận")).toBeInTheDocument();
		expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
	});

	it("renders description", () => {
		renderKudos();
		expect(screen.getByText(/ĐIỂM MỚI CỦA SAA 2025/)).toBeInTheDocument();
	});

	it("renders detail button linking to sun kudos page", () => {
		renderKudos();
		const link = screen.getByRole("link", { name: /chi tiết/i });
		expect(link).toHaveAttribute("href", "/sun-kudos");
	});
});
