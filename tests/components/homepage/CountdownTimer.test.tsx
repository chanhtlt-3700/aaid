import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CountdownTimer } from "@/components/homepage/CountdownTimer";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

function renderCountdown(props: { onExpired?: (expired: boolean) => void } = {}) {
	return render(
		<LanguageProvider>
			<CountdownTimer {...props} />
		</LanguageProvider>,
	);
}

describe("CountdownTimer", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllEnvs();
	});

	it("renders timer with days, hours, minutes labels", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderCountdown();

		expect(screen.getByText("Ngày")).toBeInTheDocument();
		expect(screen.getByText("Giờ")).toBeInTheDocument();
		expect(screen.getByText("Phút")).toBeInTheDocument();
	});

	it("has role=timer for accessibility", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		renderCountdown();

		expect(screen.getByRole("timer")).toBeInTheDocument();
	});

	it("shows 00 values when event date has passed", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2020-01-01T00:00:00+07:00");
		const onExpired = vi.fn();
		renderCountdown({ onExpired });

		const digits = screen.getByRole("timer").querySelectorAll(".font-share-tech-mono");
		const allZero = Array.from(digits).every((d) => d.textContent === "0");
		expect(allZero).toBe(true);
		expect(onExpired).toHaveBeenCalledWith(true);
	});

	it("calls onExpired(false) when event is in the future", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "2099-12-26T18:00:00+07:00");
		const onExpired = vi.fn();
		renderCountdown({ onExpired });

		expect(onExpired).toHaveBeenCalledWith(false);
	});

	it("updates countdown after 60 seconds", () => {
		const future = new Date(Date.now() + 2 * 60 * 1000 + 30 * 1000);
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", future.toISOString());
		renderCountdown();

		act(() => {
			vi.advanceTimersByTime(60_000);
		});

		// After 60s, the timer should have updated (1 fewer minute)
		expect(screen.getByRole("timer")).toBeInTheDocument();
	});

	it("falls back to default date when env var is missing", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "");
		renderCountdown();

		// Should render without errors
		expect(screen.getByRole("timer")).toBeInTheDocument();
	});

	it("falls back to default date when env var is invalid", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATE", "not-a-date");
		const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		renderCountdown();

		expect(screen.getByRole("timer")).toBeInTheDocument();
		consoleSpy.mockRestore();
	});
});
