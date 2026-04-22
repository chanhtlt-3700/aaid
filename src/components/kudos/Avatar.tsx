interface AvatarProps {
	initials: string;
	size?: "sm" | "md" | "lg";
}

const sizeMap = {
	sm: "h-6 w-6 text-[10px]",
	md: "h-10 w-10 text-sm",
	lg: "h-12 w-12 text-base",
};

export function Avatar({ initials, size = "md" }: AvatarProps) {
	return (
		<span
			className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#FFEA9E]/20 font-montserrat font-bold text-[#FFEA9E] ring-1 ring-[#998C5F]/50 ${sizeMap[size]}`}
			aria-hidden="true"
		>
			{initials}
		</span>
	);
}
