import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

const authFreePaths = ["/", "/auth/callback", "/countdown"];

function getSystemOpenAt(): number | null {
	const raw = process.env.NEXT_PUBLIC_SYSTEM_OPEN_AT;
	if (!raw) return null;
	const parsed = new Date(raw).getTime();
	return Number.isFinite(parsed) ? parsed : null;
}

export async function middleware(request: NextRequest) {
	const { supabase, supabaseResponse } = createClient(request);
	const { pathname } = request.nextUrl;

	const isAuthFreePath = authFreePaths.some(
		(path) => pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
	);

	const systemOpenAt = getSystemOpenAt();
	if (
		systemOpenAt !== null &&
		Date.now() < systemOpenAt &&
		pathname !== "/countdown" &&
		!pathname.startsWith("/auth/callback")
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/countdown";
		url.searchParams.delete("redirect");
		url.searchParams.delete("error");
		return NextResponse.redirect(url);
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user && pathname === "/") {
		const url = request.nextUrl.clone();
		url.pathname = request.nextUrl.searchParams.get("redirect") || "/dashboard";
		url.searchParams.delete("redirect");
		return NextResponse.redirect(url);
	}

	if (!user && !isAuthFreePath) {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.searchParams.set("redirect", pathname);
		const hasSessionCookie = request.cookies.getAll().some(
			(c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"),
		);
		if (hasSessionCookie) {
			url.searchParams.set("error", "session_expired");
		}
		return NextResponse.redirect(url);
	}

	const langParam = request.nextUrl.searchParams.get("lang");
	const langCookie = request.cookies.get("saa-lang")?.value;
	if (langParam && langParam !== langCookie) {
		supabaseResponse.cookies.set("saa-lang", langParam, {
			path: "/",
			maxAge: 31536000,
			sameSite: "lax",
		});
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.svg|assets/|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
