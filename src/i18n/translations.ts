export type LanguageCode = "VN" | "EN";

interface Translations {
	hero: {
		tagline: string;
		cta: string;
	};
	login: {
		button: string;
		buttonAriaLabel: string;
		error: string;
	};
	footer: {
		copyright: string;
	};
	dashboard: {
		welcome: string;
		loggedInAs: string;
		logout: string;
	};
}

export type { Translations };

export const translations: Record<LanguageCode, Translations> = {
	VN: {
		hero: {
			tagline: "Bắt đầu hành trình của bạn cùng SAA 2025.",
			cta: "Đăng nhập để khám phá!",
		},
		login: {
			button: "ĐĂNG NHẬP với Google",
			buttonAriaLabel: "Đăng nhập với Google",
			error: "Dịch vụ đăng nhập tạm thời không khả dụng. Vui lòng thử lại sau.",
		},
		footer: {
			copyright: "Bản quyền thuộc về Sun* © 2025",
		},
		dashboard: {
			welcome: "Chào mừng đến SAA 2025",
			loggedInAs: "Đã đăng nhập:",
			logout: "Đăng xuất",
		},
	},
	EN: {
		hero: {
			tagline: "Start your journey with SAA 2025.",
			cta: "Log in to explore!",
		},
		login: {
			button: "LOGIN with Google",
			buttonAriaLabel: "Login with Google",
			error: "Login service is temporarily unavailable. Please try again later.",
		},
		footer: {
			copyright: "Copyright Sun* © 2025",
		},
		dashboard: {
			welcome: "Welcome to SAA 2025",
			loggedInAs: "Logged in as:",
			logout: "Logout",
		},
	},
};
