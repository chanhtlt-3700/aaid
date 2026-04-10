import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "@/components/shared/Header";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

function renderHeader() {
	return render(
		<LanguageProvider>
			<Header />
		</LanguageProvider>,
	);
}

describe("Header", () => {
	it("renders SAA 2025 logo", () => {
		renderHeader();
		const logo = screen.getByAltText("SAA 2025");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("src", "/assets/login/logos/saa-logo.png");
	});

	it("renders LanguageSelector component", () => {
		renderHeader();
		const selector = screen.getByRole("button", { name: /select language/i });
		expect(selector).toBeInTheDocument();
	});

	it("uses semantic header element", () => {
		renderHeader();
		expect(document.querySelector("header")).toBeInTheDocument();
	});
});
