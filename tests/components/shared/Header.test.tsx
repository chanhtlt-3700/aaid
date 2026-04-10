import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "@/components/shared/Header";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

describe("Header", () => {
	it("renders SAA 2025 logo", () => {
		render(<Header />);
		const logo = screen.getByAltText("SAA 2025");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("src", "/assets/login/logos/saa-logo.png");
	});

	it("renders language selector with VN text and flag icon", () => {
		render(<Header />);
		expect(screen.getByText("VN")).toBeInTheDocument();
		expect(screen.getByAltText("Vietnam flag")).toBeInTheDocument();
	});

	it("renders chevron icon in language selector", () => {
		render(<Header />);
		const selector = screen.getByRole("button", { name: /select language/i });
		const chevron = selector.querySelector("svg");
		expect(chevron).toBeInTheDocument();
	});

	it("has correct aria-label on language selector", () => {
		render(<Header />);
		const selector = screen.getByRole("button", { name: /select language/i });
		expect(selector).toHaveAttribute("aria-label", "Select language");
	});

	it("uses semantic header element", () => {
		render(<Header />);
		expect(document.querySelector("header")).toBeInTheDocument();
	});
});
