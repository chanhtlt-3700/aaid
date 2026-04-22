import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ComingSoonPage } from "@/components/shared/ComingSoonPage";
import { FloatingActionButton } from "@/components/shared/FloatingActionButton";

export default async function ProfilePage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/");

	return (
		<div className="relative min-h-screen bg-bg-primary">
			<Header variant="full" />
			<ComingSoonPage pageTitle="Profile" />
			<Footer variant="full" />
			<FloatingActionButton />
		</div>
	);
}
