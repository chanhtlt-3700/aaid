"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { LogoutButton } from "./LogoutButton";

interface DashboardContentProps {
	name: string;
	email: string;
}

export function DashboardContent({ name, email }: DashboardContentProps) {
	const { t } = useLanguage();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-primary p-8">
			<h1 className="font-montserrat text-2xl font-bold text-text-primary">
				{t.dashboard.welcome}
			</h1>
			<p className="text-text-primary">{t.dashboard.loggedInAs} {name}</p>
			<p className="text-sm text-text-primary/70">{email}</p>
			<LogoutButton />
		</div>
	);
}
