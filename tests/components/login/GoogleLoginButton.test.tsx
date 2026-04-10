import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GoogleLoginButton } from "@/components/login/GoogleLoginButton";

const mockSignInWithOAuth = vi.fn();

vi.mock("@/libs/supabase/client", () => ({
	createClient: () => ({
		auth: {
			signInWithOAuth: mockSignInWithOAuth,
		},
	}),
}));

describe("GoogleLoginButton", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockSignInWithOAuth.mockResolvedValue({ error: null });
	});

	it("renders button with correct text and Google icon", () => {
		render(<GoogleLoginButton />);
		const button = screen.getByRole("button", { name: /login with google/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("ĐĂNG NHẬP với Google");
		expect(button.querySelector("img")).toBeInTheDocument();
	});

	it("calls signInWithOAuth with provider google and correct redirectTo on click", async () => {
		render(<GoogleLoginButton />);
		const button = screen.getByRole("button", { name: /login with google/i });

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

		render(<GoogleLoginButton />);
		const button = screen.getByRole("button", { name: /login with google/i });

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

		render(<GoogleLoginButton />);
		fireEvent.click(screen.getByRole("button", { name: /login with google/i }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent(
				"Login service is temporarily unavailable",
			);
		});
	});

	it("prevents double-click by disabling on first click", async () => {
		mockSignInWithOAuth.mockImplementation(
			() => new Promise(() => {}),
		);

		render(<GoogleLoginButton />);
		const button = screen.getByRole("button", { name: /login with google/i });

		fireEvent.click(button);
		fireEvent.click(button);

		await waitFor(() => {
			expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
		});
	});
});
