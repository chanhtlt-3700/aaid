/**
 * SVG-based 7-segment display digit.
 * Renders a single digit (0-9) as an LCD/LED style display.
 * Inactive segments are shown at low opacity for the "ghosted" LCD effect.
 */

// Which segments are ON for each digit (a-g, top clockwise then middle)
//   a
//  f b
//   g
//  e c
//   d
const SEGMENT_MAP: Record<string, boolean[]> = {
	"0": [true, true, true, true, true, true, false],
	"1": [false, true, true, false, false, false, false],
	"2": [true, true, false, true, true, false, true],
	"3": [true, true, true, true, false, false, true],
	"4": [false, true, true, false, false, true, true],
	"5": [true, false, true, true, false, true, true],
	"6": [true, false, true, true, true, true, true],
	"7": [true, true, true, false, false, false, false],
	"8": [true, true, true, true, true, true, true],
	"9": [true, true, true, true, false, true, true],
};

// Segment paths for a 30x50 viewBox
const SEGMENTS = [
	// a - top horizontal
	"M 5 2 L 25 2 L 23 6 L 7 6 Z",
	// b - top-right vertical
	"M 26 4 L 26 22 L 24 20 L 24 6 Z",
	// c - bottom-right vertical
	"M 26 28 L 26 46 L 24 44 L 24 30 Z",
	// d - bottom horizontal
	"M 5 48 L 25 48 L 23 44 L 7 44 Z",
	// e - bottom-left vertical
	"M 4 28 L 4 46 L 6 44 L 6 30 Z",
	// f - top-left vertical
	"M 4 4 L 4 22 L 6 20 L 6 6 Z",
	// g - middle horizontal
	"M 6 24 L 24 24 L 23 27 L 7 27 Z",
];

interface SevenSegmentDigitProps {
	digit: string;
	size?: number;
}

export function SevenSegmentDigit({ digit, size = 50 }: SevenSegmentDigitProps) {
	const segments = SEGMENT_MAP[digit] ?? SEGMENT_MAP["0"];
	const scale = size / 50;

	return (
		<svg
			width={30 * scale}
			height={50 * scale}
			viewBox="0 0 30 50"
			fill="none"
			aria-hidden="true"
		>
			{SEGMENTS.map((path, i) => (
				<path
					key={i}
					d={path}
					fill={segments[i] ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.06)"}
				/>
			))}
		</svg>
	);
}
