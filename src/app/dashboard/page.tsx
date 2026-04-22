import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { RootFurtherSection } from "@/components/homepage/RootFurtherSection";
import { AwardsSection } from "@/components/homepage/AwardsSection";
import { KudosSection } from "@/components/homepage/KudosSection";
import { FloatingActionButton } from "@/components/shared/FloatingActionButton";

export default async function DashboardPage() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) {
		redirect("/");
	}

	return (
		<div className="relative min-h-screen bg-bg-primary">
			<Header variant="full" />
			<main>
				<HeroSection />
				<div className="flex flex-col gap-24 py-24 md:gap-[120px]">
					<RootFurtherSection />
					<AwardsSection />
					<KudosSection />
				</div>
			</main>
			<Footer variant="full" />
			<FloatingActionButton />
		</div>
	);
}
