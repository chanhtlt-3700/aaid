import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { DashboardContent } from "./DashboardContent";

export default async function DashboardPage() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) {
		redirect("/");
	}

	const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? "User";
	const email = user.email ?? "";

	return <DashboardContent name={name} email={email} />;
}
