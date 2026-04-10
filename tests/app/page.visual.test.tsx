import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";

const mockGetUser = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
	createClient: vi.fn().mockResolvedValue({
		auth: {
			getUser: () => mockGetUser(),
		},
	}),
}));

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

vi.mock("@/components/login/GoogleLoginButton", () => ({
	GoogleLoginButton: () => (
		<button type="button">ĐĂNG NHẬP với Google</button>
	),
}));

describe("Login Page Visual", () => {
	it("all images have correct alt attributes", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });

		const { default: LoginPage } = await import("@/app/page");
		const jsx = await LoginPage();
		render(<LanguageProvider>{jsx}</LanguageProvider>);

		expect(screen.getByAltText("SAA 2025")).toBeInTheDocument();
		expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
		expect(screen.getByAltText("Vietnam flag")).toBeInTheDocument();
	});

	it("renders all expected text content", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });

		const { default: LoginPage } = await import("@/app/page");
		const jsx = await LoginPage();
		render(<LanguageProvider>{jsx}</LanguageProvider>);

		expect(screen.getByText("VN")).toBeInTheDocument();
		expect(
			screen.getByText(/Bắt đầu hành trình của bạn cùng SAA 2025/),
		).toBeInTheDocument();
		expect(screen.getByText(/Đăng nhập để khám phá!/)).toBeInTheDocument();
		expect(
			screen.getByText(/Bản quyền thuộc về Sun\* © 2025/),
		).toBeInTheDocument();
	});

	it("page has correct semantic structure", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });

		const { default: LoginPage } = await import("@/app/page");
		const jsx = await LoginPage();
		render(<LanguageProvider>{jsx}</LanguageProvider>);

		expect(document.querySelector("header")).toBeInTheDocument();
		expect(document.querySelector("main")).toBeInTheDocument();
		expect(document.querySelector("footer")).toBeInTheDocument();
	});
});
