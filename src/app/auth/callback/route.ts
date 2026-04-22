import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

const ALLOWED_DOMAINS = (
	process.env.ALLOWED_EMAIL_DOMAINS ?? "@sun-asterisk.com"
)
	.split(",")
	.map((d) => d.trim().toLowerCase())
	.filter(Boolean);

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const redirectPath = searchParams.get("next") ?? searchParams.get("redirect") ?? "/dashboard";

	if (!code) {
		return NextResponse.redirect(new URL("/?error=missing_code", origin));
	}

	const supabase = await createClient();
	const { data, error } = await supabase.auth.exchangeCodeForSession(code);

	if (error || !data?.user) {
		return NextResponse.redirect(new URL("/?error=auth_failed", origin));
	}

	const email = data.user.email?.toLowerCase() ?? "";
	const isAllowed = ALLOWED_DOMAINS.some((domain) => email.endsWith(domain));

	if (!isAllowed) {
		await supabase.auth.signOut();
		return NextResponse.redirect(new URL("/?error=unauthorized", origin));
	}

	const safePath = redirectPath.startsWith("/") ? redirectPath : "/dashboard";
	return NextResponse.redirect(new URL(safePath, origin));
}
