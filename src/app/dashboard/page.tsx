import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { LogoutButton } from "./LogoutButton";

export default async function DashboardPage() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) {
		redirect("/");
	}

	const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? "User";
	const email = user.email ?? "";

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-primary p-8">
			<h1 className="font-montserrat text-2xl font-bold text-text-primary">
				Welcome to SAA 2025
			</h1>
			<p className="text-text-primary">Logged in as: {name}</p>
			<p className="text-sm text-text-primary/70">{email}</p>
			<LogoutButton />
		</div>
	);
}
