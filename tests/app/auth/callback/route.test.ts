import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/auth/callback/route";

const mockExchangeCodeForSession = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
	createClient: vi.fn().mockResolvedValue({
		auth: {
			exchangeCodeForSession: (...args: unknown[]) =>
				mockExchangeCodeForSession(...args),
			signOut: (...args: unknown[]) => mockSignOut(...args),
		},
	}),
}));

const allowedUser = { email: "chanh@sun-asterisk.com" };

describe("Auth callback route", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("redirects to /?error=missing_code when code param is missing", async () => {
		const request = new Request("http://localhost:3000/auth/callback");
		const response = await GET(request);

		expect(response.status).toBe(307);
		const loc = new URL(response.headers.get("location")!);
		expect(loc.pathname).toBe("/");
		expect(loc.searchParams.get("error")).toBe("missing_code");
		expect(mockExchangeCodeForSession).not.toHaveBeenCalled();
	});

	it("exchanges code for session and redirects to /dashboard for allowed domain", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			data: { user: allowedUser },
			error: null,
		});
		const request = new Request(
			"http://localhost:3000/auth/callback?code=valid-code",
		);
		const response = await GET(request);

		expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid-code");
		expect(response.status).toBe(307);
		expect(new URL(response.headers.get("location")!).pathname).toBe(
			"/dashboard",
		);
	});

	it("redirects to /?error=auth_failed on exchange failure", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			data: null,
			error: { message: "Invalid code" },
		});

		const request = new Request(
			"http://localhost:3000/auth/callback?code=bad-code",
		);
		const response = await GET(request);

		expect(response.status).toBe(307);
		const loc = new URL(response.headers.get("location")!);
		expect(loc.pathname).toBe("/");
		expect(loc.searchParams.get("error")).toBe("auth_failed");
	});

	it("respects next query param for allowed domain", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			data: { user: allowedUser },
			error: null,
		});
		const request = new Request(
			"http://localhost:3000/auth/callback?code=valid-code&next=/profile",
		);
		const response = await GET(request);

		expect(new URL(response.headers.get("location")!).pathname).toBe(
			"/profile",
		);
	});

	it("signs out and redirects to /?error=unauthorized for disallowed email domain", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			data: { user: { email: "user@gmail.com" } },
			error: null,
		});
		const request = new Request(
			"http://localhost:3000/auth/callback?code=valid-code",
		);
		const response = await GET(request);

		expect(mockSignOut).toHaveBeenCalled();
		expect(response.status).toBe(307);
		const loc = new URL(response.headers.get("location")!);
		expect(loc.pathname).toBe("/");
		expect(loc.searchParams.get("error")).toBe("unauthorized");
	});

	it("rejects open-redirect in next param and falls back to /dashboard", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			data: { user: allowedUser },
			error: null,
		});
		const request = new Request(
			"http://localhost:3000/auth/callback?code=valid-code&next=https://evil.com/phish",
		);
		const response = await GET(request);

		expect(new URL(response.headers.get("location")!).pathname).toBe(
			"/dashboard",
		);
	});
});
