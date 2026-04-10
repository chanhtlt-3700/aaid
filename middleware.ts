import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

export async function middleware(request: NextRequest) {
	const { supabase, supabaseResponse } = createClient(request);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	// Redirect unauthenticated users from protected routes to login
	if (!user && pathname.startsWith("/dashboard")) {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	// Redirect authenticated users from login page to dashboard
	if (user && pathname === "/") {
		const url = request.nextUrl.clone();
		url.pathname = "/dashboard";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon\\.ico|favicon\\.svg|assets/).*)",
	],
};
