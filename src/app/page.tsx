import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/shared/Header";
import { HeroSection } from "@/components/login/HeroSection";
import { Footer } from "@/components/shared/Footer";

export default async function LoginPage() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (user) {
		redirect("/dashboard");
	}

	return (
		<div className="relative h-screen w-screen overflow-hidden bg-bg-primary">
			{/* Background: Key Visual */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/assets/login/images/key-visual.png"
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-right-center"
					style={{ objectPosition: "100% 50%" }}
				/>
			</div>

			{/* Gradient: Left to right */}
			<div
				className="absolute inset-0 z-[1]"
				style={{
					background: "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0) 100%)",
				}}
			/>

			{/* Gradient: Bottom to top */}
			<div
				className="absolute bottom-0 left-0 right-0 z-[1] h-[400px]"
				style={{
					background: "linear-gradient(0deg, #00101A 0%, rgba(0, 19, 32, 0) 70%)",
				}}
			/>

			{/* Content wrapper */}
			<div className="relative z-10 flex h-screen flex-col">
				<Header />
				<main className="flex flex-1 flex-col justify-center">
					<HeroSection />
				</main>
				<Footer />
			</div>
		</div>
	);
}
