import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { KeyvisualBanner } from "@/components/awards/KeyvisualBanner";
import { AwardsPageTitle } from "@/components/awards/AwardsPageTitle";
import { AwardsContent } from "@/components/awards/AwardsContent";
import { KudosSection } from "@/components/homepage/KudosSection";
import { FloatingActionButton } from "@/components/shared/FloatingActionButton";

export default async function AwardsInformationPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/");
	}

	return (
		<div className="relative min-h-screen bg-bg-primary">
			<Header variant="full" />
			<main>
				<KeyvisualBanner />
				<div className="mx-auto w-full max-w-[1440px] px-3 pt-16 sm:px-6 md:px-8 lg:px-36">
					<AwardsPageTitle />
				</div>
				<AwardsContent />
				<div className="py-24">
					<KudosSection />
				</div>
			</main>
			<Footer variant="full" />
			<FloatingActionButton />
		</div>
	);
}
