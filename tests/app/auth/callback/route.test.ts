import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/auth/callback/route";

const mockExchangeCodeForSession = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
	createClient: vi.fn().mockResolvedValue({
		auth: {
			exchangeCodeForSession: (...args: unknown[]) =>
				mockExchangeCodeForSession(...args),
		},
	}),
}));

describe("Auth callback route", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("redirects to / when code param is missing", async () => {
		const request = new Request("http://localhost:3000/auth/callback");
		const response = await GET(request);

		expect(response.status).toBe(307);
		expect(new URL(response.headers.get("location")!).pathname).toBe("/");
		expect(mockExchangeCodeForSession).not.toHaveBeenCalled();
	});

	it("exchanges code for session and redirects to /dashboard on success", async () => {
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
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

	it("redirects to / on exchange failure without leaking error", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			error: { message: "Invalid code" },
		});
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const request = new Request(
			"http://localhost:3000/auth/callback?code=bad-code",
		);
		const response = await GET(request);

		expect(response.status).toBe(307);
		expect(new URL(response.headers.get("location")!).pathname).toBe("/");
		expect(consoleSpy).toHaveBeenCalled();
		consoleSpy.mockRestore();
	});

	it("respects next query param for redirect target", async () => {
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
		const request = new Request(
			"http://localhost:3000/auth/callback?code=valid-code&next=/profile",
		);
		const response = await GET(request);

		expect(new URL(response.headers.get("location")!).pathname).toBe(
			"/profile",
		);
	});
});
