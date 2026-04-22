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

vi.mock("next/navigation", () => ({
	usePathname: () => "/dashboard",
}));

function renderHeader(variant?: "minimal" | "full") {
	return render(
		<LanguageProvider>
			<Header variant={variant} />
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

	it("does not render nav links in minimal variant", () => {
		renderHeader("minimal");
		expect(screen.queryByText("About SAA 2025")).not.toBeInTheDocument();
	});

	it("renders nav links in full variant", () => {
		renderHeader("full");
		expect(screen.getByText("About SAA 2025")).toBeInTheDocument();
		expect(screen.getByText("Awards Information")).toBeInTheDocument();
		expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
	});

	it("renders notification bell in full variant", () => {
		renderHeader("full");
		expect(screen.getByRole("button", { name: /thông báo/i })).toBeInTheDocument();
	});

	it("renders profile button in full variant", () => {
		renderHeader("full");
		expect(screen.getByRole("button", { name: /profile/i })).toBeInTheDocument();
	});
});
