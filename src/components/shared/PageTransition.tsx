"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export function PageTransition({ children }: Props) {
	const pathname = usePathname();

	return (
		<div key={pathname} className="animate-page-enter">
			{children}
		</div>
	);
}
