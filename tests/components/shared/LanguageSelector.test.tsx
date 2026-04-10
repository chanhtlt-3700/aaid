import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/image", () => ({
	default: (props: Record<string, unknown>) => {
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

function renderWithProvider() {
	return render(
		<LanguageProvider>
			<LanguageSelector />
		</LanguageProvider>,
	);
}

describe("LanguageSelector", () => {
	beforeEach(() => {
		Object.defineProperty(document, "cookie", {
			writable: true,
			value: "",
		});
	});

	it("renders trigger button with VN flag and text by default", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });
		expect(trigger).toBeInTheDocument();
		expect(screen.getByAltText("Vietnam flag")).toBeInTheDocument();
		expect(screen.getByText("VN")).toBeInTheDocument();
	});

	it("renders trigger with aria-expanded=false when closed", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("opens dropdown on trigger click", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });
		fireEvent.click(trigger);

		expect(trigger).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByRole("listbox")).toBeInTheDocument();
		expect(screen.getAllByRole("option")).toHaveLength(2);
	});

	it("shows VN and EN options in the dropdown", () => {
		renderWithProvider();
		fireEvent.click(screen.getByRole("button", { name: /select language/i }));

		const options = screen.getAllByRole("option");
		expect(options[0]).toHaveTextContent("VN");
		expect(options[1]).toHaveTextContent("EN");
	});

	it("highlights the currently selected language", () => {
		renderWithProvider();
		fireEvent.click(screen.getByRole("button", { name: /select language/i }));

		const options = screen.getAllByRole("option");
		expect(options[0]).toHaveAttribute("aria-selected", "true");
		expect(options[1]).toHaveAttribute("aria-selected", "false");
	});

	it("selects EN on click and closes dropdown", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });
		fireEvent.click(trigger);

		const enOption = screen.getAllByRole("option")[1];
		fireEvent.click(enOption);

		expect(trigger).toHaveAttribute("aria-expanded", "false");
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(screen.getByAltText("English flag")).toBeInTheDocument();
	});

	it("closes dropdown without change when selecting already-selected language", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });
		fireEvent.click(trigger);

		const vnOption = screen.getAllByRole("option")[0];
		fireEvent.click(vnOption);

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(screen.getByText("VN")).toBeInTheDocument();
	});

	it("closes dropdown on outside click", () => {
		renderWithProvider();
		fireEvent.click(screen.getByRole("button", { name: /select language/i }));
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		fireEvent.mouseDown(document.body);
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("closes dropdown on Escape key", () => {
		renderWithProvider();
		fireEvent.click(screen.getByRole("button", { name: /select language/i }));
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("persists language choice to cookie", () => {
		renderWithProvider();
		fireEvent.click(screen.getByRole("button", { name: /select language/i }));
		fireEvent.click(screen.getAllByRole("option")[1]);

		expect(document.cookie).toContain("lang=EN");
	});

	it("reads language preference from cookie on mount", () => {
		Object.defineProperty(document, "cookie", {
			writable: true,
			value: "lang=EN",
		});

		renderWithProvider();
		expect(screen.getByAltText("English flag")).toBeInTheDocument();
	});

	it("defaults to VN when cookie is missing", () => {
		renderWithProvider();
		expect(screen.getByAltText("Vietnam flag")).toBeInTheDocument();
		expect(screen.getByText("VN")).toBeInTheDocument();
	});

	it("toggles dropdown closed on second trigger click", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });

		fireEvent.click(trigger);
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		fireEvent.click(trigger);
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("rotates chevron when dropdown is open", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });
		const chevron = trigger.querySelector("svg")!;

		expect(chevron.className.baseVal || chevron.getAttribute("class")).not.toContain("rotate-180");

		fireEvent.click(trigger);
		expect(chevron.className.baseVal || chevron.getAttribute("class")).toContain("rotate-180");
	});

	it("opens dropdown on ArrowDown key when closed", () => {
		renderWithProvider();
		const trigger = screen.getByRole("button", { name: /select language/i });

		fireEvent.keyDown(trigger, { key: "ArrowDown" });
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});

	it("displays flag icons with correct dimensions", () => {
		renderWithProvider();
		const flag = screen.getByAltText("Vietnam flag");
		expect(flag).toHaveAttribute("width", "20");
		expect(flag).toHaveAttribute("height", "15");
	});
});
