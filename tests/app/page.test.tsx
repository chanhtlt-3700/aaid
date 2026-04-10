import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

const mockGetUser = vi.fn();
const mockRedirect = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
	createClient: vi.fn().mockResolvedValue({
		auth: {
			getUser: () => mockGetUser(),
		},
	}),
}));

vi.mock("next/navigation", () => ({
	redirect: (url: string) => {
		mockRedirect(url);
		throw new Error("NEXT_REDIRECT");
	},
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

describe("Login Page", () => {
	it("renders Header, HeroSection, and Footer when unauthenticated", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });

		const { default: LoginPage } = await import("@/app/page");
		const jsx = await LoginPage();
		render(jsx);

		expect(screen.getByAltText("SAA 2025")).toBeInTheDocument();
		expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
		expect(
			screen.getByText(/Bắt đầu hành trình của bạn cùng SAA 2025/),
		).toBeInTheDocument();
		expect(
			screen.getByText(/ĐĂNG NHẬP với Google/),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Bản quyền thuộc về Sun\*/),
		).toBeInTheDocument();
	});

	it("redirects to /dashboard when user is authenticated", async () => {
		mockGetUser.mockResolvedValue({
			data: { user: { id: "123", email: "test@test.com" } },
		});

		const { default: LoginPage } = await import("@/app/page");

		await expect(LoginPage()).rejects.toThrow("NEXT_REDIRECT");
		expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
	});
});
