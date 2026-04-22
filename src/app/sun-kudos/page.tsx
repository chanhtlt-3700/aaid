import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingActionButton } from "@/components/shared/FloatingActionButton";
import { KudosKeyvisual } from "@/components/kudos/KudosKeyvisual";
import { KudosWriteBar } from "@/components/kudos/KudosWriteBar";
import { HighlightKudos } from "@/components/kudos/HighlightKudos";
import { SpotlightPlaceholder } from "@/components/kudos/SpotlightPlaceholder";
import { AllKudosFeed } from "@/components/kudos/AllKudosFeed";
import { KudosSidebar } from "@/components/kudos/KudosSidebar";

export default async function SunKudosPage() {
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
				<KudosKeyvisual />

				<div className="mx-auto w-full max-w-[1440px] px-3 pt-10 sm:px-6 md:px-8 lg:px-36">
					<KudosWriteBar />
				</div>

				<div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-3 py-16 sm:px-6 md:px-8 lg:px-36">
					<HighlightKudos />
					<SpotlightPlaceholder />

					<div className="flex flex-col gap-12 lg:flex-row lg:items-start">
						<div className="flex-1">
							<AllKudosFeed />
						</div>
						<div className="w-full lg:w-80 lg:shrink-0">
							<KudosSidebar />
						</div>
					</div>
				</div>
			</main>
			<Footer variant="full" />
			<FloatingActionButton />
		</div>
	);
}
