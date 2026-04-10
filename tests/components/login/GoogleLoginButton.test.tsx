import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GoogleLoginButton } from "@/components/login/GoogleLoginButton";
import { LanguageProvider } from "@/i18n/LanguageContext";

const mockSignInWithOAuth = vi.fn();

vi.mock("@/libs/supabase/client", () => ({
	createClient: () => ({
		auth: {
			signInWithOAuth: mockSignInWithOAuth,
		},
	}),
}));

function renderButton() {
	return render(
		<LanguageProvider>
			<GoogleLoginButton />
		</LanguageProvider>,
	);
}

describe("GoogleLoginButton", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockSignInWithOAuth.mockResolvedValue({ error: null });
	});

	it("renders button with correct text and Google icon", () => {
		renderButton();
		const button = screen.getByRole("button", { name: /google/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("ĐĂNG NHẬP với Google");
		expect(button.querySelector("img")).toBeInTheDocument();
	});

	it("calls signInWithOAuth with provider google and correct redirectTo on click", async () => {
		renderButton();
		const button = screen.getByRole("button", { name: /google/i });

		fireEvent.click(button);

		await waitFor(() => {
			expect(mockSignInWithOAuth).toHaveBeenCalledWith({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			});
		});
	});

	it("shows loading state and disables button during OAuth", async () => {
		mockSignInWithOAuth.mockImplementation(
			() => new Promise(() => {}),
		);

		renderButton();
		const button = screen.getByRole("button", { name: /google/i });

		fireEvent.click(button);

		await waitFor(() => {
			expect(button).toBeDisabled();
			expect(button.querySelector("svg.animate-spin")).toBeInTheDocument();
		});
	});

	it("shows error message on OAuth failure", async () => {
		mockSignInWithOAuth.mockResolvedValue({
			error: { message: "OAuth error" },
		});

		renderButton();
		fireEvent.click(screen.getByRole("button", { name: /google/i }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent(
				"Dịch vụ đăng nhập tạm thời không khả dụng",
			);
		});
	});

	it("prevents double-click by disabling on first click", async () => {
		mockSignInWithOAuth.mockImplementation(
			() => new Promise(() => {}),
		);

		renderButton();
		const button = screen.getByRole("button", { name: /google/i });

		fireEvent.click(button);
		fireEvent.click(button);

		await waitFor(() => {
			expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
		});
	});
});
