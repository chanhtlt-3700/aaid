"use client";

import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/");
	};

	return (
		<button
			onClick={handleLogout}
			className="rounded-lg bg-white/10 px-6 py-3 font-montserrat text-sm font-bold text-text-primary transition-colors hover:bg-white/20"
		>
			Logout
		</button>
	);
}
