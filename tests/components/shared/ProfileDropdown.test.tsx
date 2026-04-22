import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import { LanguageProvider } from "@/i18n/LanguageContext";

const pushMock = vi.fn();
const refreshMock = vi.fn();
const signOutMock = vi.fn().mockResolvedValue({ error: null });

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

vi.mock("@/libs/supabase/client", () => ({
	createClient: () => ({
		auth: { signOut: signOutMock },
	}),
}));

function renderDropdown() {
	return render(
		<LanguageProvider>
			<ProfileDropdown />
		</LanguageProvider>,
	);
}

describe("ProfileDropdown", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("does not show menu by default", () => {
		renderDropdown();
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("opens menu when trigger is clicked", () => {
		renderDropdown();
		fireEvent.click(screen.getByRole("button", { name: /mở menu tài khoản/i }));

		expect(screen.getByRole("menu")).toBeInTheDocument();
		expect(screen.getByRole("menuitem", { name: /profile/i })).toBeInTheDocument();
		expect(screen.getByRole("menuitem", { name: /logout/i })).toBeInTheDocument();
	});

	it("closes menu when Escape is pressed and restores focus to trigger", () => {
		renderDropdown();
		const trigger = screen.getByRole("button", { name: /mở menu tài khoản/i });
		fireEvent.click(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();

		fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	it("calls supabase.auth.signOut and routes to / when Logout is clicked", async () => {
		renderDropdown();
		fireEvent.click(screen.getByRole("button", { name: /mở menu tài khoản/i }));
		fireEvent.click(screen.getByRole("menuitem", { name: /logout/i }));

		await waitFor(() => {
			expect(signOutMock).toHaveBeenCalledTimes(1);
			expect(pushMock).toHaveBeenCalledWith("/");
		});
	});

	it("Profile item links to /profile and closes dropdown on click", () => {
		renderDropdown();
		fireEvent.click(screen.getByRole("button", { name: /mở menu tài khoản/i }));

		const profileLink = screen.getByRole("menuitem", { name: /profile/i });
		expect(profileLink).toHaveAttribute("href", "/profile");

		fireEvent.click(profileLink);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});
});
