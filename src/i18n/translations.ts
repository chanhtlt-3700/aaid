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
		errorUnauthorized: string;
		errorSessionExpired: string;
		errorAuthFailed: string;
		errorMissingCode: string;
	};
	footer: {
		copyright: string;
	};
	dashboard: {
		welcome: string;
		loggedInAs: string;
		logout: string;
	};
	profileDropdown: {
		triggerAriaLabel: string;
		menuAriaLabel: string;
		profile: string;
		logout: string;
		loggingOut: string;
	};
	awardsPage: {
		bannerTitle: string;
		caption: string;
		pageTitle: string;
		quantityLabel: string;
		valueLabel: string;
		unitIndividual: string;
		unitTeam: string;
		unitBoth: string;
		prizeNoteEach: string;
		prizeNoteIndTeam: string;
		descriptions: {
			topTalent: string;
			topProject: string;
			topProjectLeader: string;
			bestManager: string;
			signatureCreator: string;
			mvp: string;
		};
	};
	countdownPage: {
		title: string;
		subtitle: string;
		eventLabel: string;
		openCta: string;
	};
	comingSoonPage: {
		title: string;
		description: string;
		backToDashboard: string;
	};
	fab: {
		openMenu: string;
		closeMenu: string;
		rules: string;
		writeKudo: string;
		cancel: string;
	};
	notificationPanel: {
		triggerAriaLabel: string;
		panelTitle: string;
		markAllRead: string;
		viewAll: string;
		empty: string;
		timeJustNow: string;
		timeMinutes: string;
		timeHours: string;
		timeDays: string;
		sampleTitles: {
			kudo: string;
			heart: string;
			gift: string;
			system: string;
		};
		sampleMessages: {
			kudo: string;
			heart: string;
			gift: string;
			system: string;
		};
	};
	kudosRulesModal: {
		title: string;
		intro: string;
		rewardsTitle: string;
		rewards: string[];
		badgesTitle: string;
		badges: { icon: string; name: string }[];
		close: string;
		writeKudoCta: string;
	};
	writeKudoModal: {
		title: string;
		close: string;
		recipientLabel: string;
		recipientPlaceholder: string;
		contentPlaceholder: string;
		contentHint: string;
		hashtagLabel: string;
		hashtagAdd: string;
		maxHashtags: string;
		imageLabel: string;
		imageAdd: string;
		maxImages: string;
		anonymousToggle: string;
		anonymousNamePlaceholder: string;
		cancel: string;
		submit: string;
		submittedAlert: string;
		validationMissing: string;
	};
	kudosPage: {
		bannerTitle: string;
		bannerSubtitle: string;
		writePlaceholder: string;
		writeComingSoon: string;
		highlightSubtitle: string;
		highlightTitle: string;
		allKudosSubtitle: string;
		allKudosTitle: string;
		spotlightSubtitle: string;
		spotlightTitle: string;
		spotlightComingSoon: string;
		emptyFeed: string;
		copyLink: string;
		linkCopied: string;
		viewDetail: string;
		anonymous: string;
		sidebar: {
			title: string;
			kudosReceived: string;
			kudosSent: string;
			heartsReceived: string;
			heartsGiven: string;
			secretBoxes: string;
			secretBoxesOpened: string;
			openGift: string;
			recentRankings: string;
			recentGifts: string;
			noData: string;
		};
	};
	homepage: {
		nav: {
			aboutSAA: string;
			awardsInfo: string;
			sunKudos: string;
			standards: string;
			notifications: string;
		};
		hero: {
			comingSoon: string;
			aboutAwards: string;
			aboutKudos: string;
		};
		countdown: {
			days: string;
			hours: string;
			minutes: string;
		};
		eventInfo: {
			dateLabel: string;
			dateValue: string;
			venueLabel: string;
			venueValue: string;
			livestreamNote: string;
		};
		rootFurther: {
			quote: string;
			paragraph1: string;
			paragraph2: string;
			paragraph3: string;
		};
		awards: {
			caption: string;
			title: string;
			description: string;
			detailLink: string;
		};
		topTalent: {
			title: string;
			description: string;
		};
		topProject: {
			title: string;
			description: string;
		};
		topProjectLeader: {
			title: string;
			description: string;
		};
		bestManager: {
			title: string;
			description: string;
		};
		signatureCreator: {
			title: string;
			description: string;
		};
		mvp: {
			title: string;
			description: string;
		};
		kudos: {
			label: string;
			title: string;
			description: string;
			detailButton: string;
			highlight: string;
		};
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
			errorUnauthorized: "Email không được phép đăng nhập. Vui lòng dùng email Sun*.",
			errorSessionExpired: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
			errorAuthFailed: "Đăng nhập thất bại. Vui lòng thử lại.",
			errorMissingCode: "Thiếu mã xác thực. Vui lòng thử lại.",
		},
		footer: {
			copyright: "Bản quyền thuộc về Sun* © 2025",
		},
		dashboard: {
			welcome: "Chào mừng đến SAA 2025",
			loggedInAs: "Đã đăng nhập:",
			logout: "Đăng xuất",
		},
		profileDropdown: {
			triggerAriaLabel: "Mở menu tài khoản",
			menuAriaLabel: "Menu tài khoản",
			profile: "Profile",
			logout: "Logout",
			loggingOut: "Đang đăng xuất...",
		},
		awardsPage: {
			bannerTitle: "ROOT FURTHER - Sun* Annual Award 2025",
			caption: "Sun* annual awards 2025",
			pageTitle: "Hệ thống giải thưởng SAA 2025",
			quantityLabel: "Số lượng giải thưởng:",
			valueLabel: "Giá trị giải thưởng:",
			unitIndividual: "Cá nhân",
			unitTeam: "Tập thể",
			unitBoth: "Cá nhân hoặc tập thể",
			prizeNoteEach: "cho mỗi giải thưởng",
			prizeNoteIndTeam: "cho giải cá nhân / tập thể",
			descriptions: {
				topTalent: "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc toàn diện – những người không ngừng khẳng định năng lực chuyên môn vững vàng, hiệu suất công việc vượt trội, luôn mang lại giá trị vượt kỳ vọng, được đánh giá cao bởi khách hàng và đồng đội. Với tinh thần sẵn sàng nhận mọi nhiệm vụ tổ chức giao phó, họ luôn là nguồn cảm hứng, thúc đẩy động lực và tạo ảnh hưởng tích cực đến cả tập thể.",
				topProject: "Giải thưởng Top Project vinh danh các tập thể dự án xuất sắc với kết quả kinh doanh vượt kỳ vọng, hiệu quả vận hành tối ưu và tinh thần làm việc tận tâm. Đây là các dự án có độ phức tạp kỹ thuật cao, hiệu quả tối ưu hóa nguồn lực và chi phí tốt, đề xuất các ý tưởng có giá trị cho khách hàng, đem lại lợi nhuận vượt trội và nhận được phản hồi tích cực từ khách hàng.",
				topProjectLeader: "Giải thưởng Top Project Leader vinh danh những nhà quản lý dự án xuất sắc – những người hội tụ năng lực quản lý vững vàng, khả năng truyền cảm hứng mạnh mẽ, và tư duy \"Aim High – Be Agile\" trong mọi bài toán và bối cảnh. Dưới sự dẫn dắt của họ, các thành viên không chỉ cùng nhau vượt qua thử thách và đạt được mục tiêu đề ra, mà còn giữ vững ngọn lửa nhiệt huyết, tinh thần Wasshoi, và trưởng thành để trở thành phiên bản tinh hoa – hạnh phúc hơn của chính mình.",
				bestManager: "Giải thưởng Best Manager vinh danh những nhà lãnh đạo tiêu biểu – người đã dẫn dắt đội ngũ của mình tạo ra kết quả vượt kỳ vọng, tác động nổi bật đến hiệu quả kinh doanh và sự phát triển bền vững của tổ chức. Dưới sự lãnh đạo của họ, đội ngũ luôn chinh phục và làm chủ mọi mục tiêu bằng năng lực đa nhiệm, khả năng phối hợp hiệu quả, và tư duy ứng dụng công nghệ linh hoạt trong kỷ nguyên số.",
				signatureCreator: "Giải thưởng Signature vinh danh cá nhân hoặc tập thể thể hiện tinh thần đặc trưng mà Sun* hướng tới trong từng thời kỳ. Trong năm 2025, giải thưởng Signature vinh danh Creator - cá nhân/tập thể mang tư duy chủ động và nhạy bén, luôn nhìn thấy cơ hội trong thách thức và tiên phong trong hành động.",
				mvp: "Giải thưởng MVP vinh danh cá nhân xuất sắc nhất năm – gương mặt tiêu biểu đại diện cho toàn bộ tập thể Sun*. Họ là người đã thể hiện năng lực vượt trội, tinh thần cống hiến bền bỉ, và tầm ảnh hưởng sâu rộng, để lại dấu ấn mạnh mẽ trong hành trình của Sun* suốt năm qua.",
			},
		},
		fab: {
			openMenu: "Mở menu nhanh",
			closeMenu: "Đóng menu nhanh",
			rules: "Thể lệ",
			writeKudo: "Viết KUDOS",
			cancel: "Hủy",
		},
		notificationPanel: {
			triggerAriaLabel: "Xem thông báo",
			panelTitle: "Thông báo",
			markAllRead: "Đánh dấu đã đọc tất cả",
			viewAll: "Xem tất cả",
			empty: "Chưa có thông báo mới",
			timeJustNow: "Vừa xong",
			timeMinutes: "{n} phút trước",
			timeHours: "{n} giờ trước",
			timeDays: "{n} ngày trước",
			sampleTitles: {
				kudo: "Bạn vừa nhận một Kudo",
				heart: "Có người thả tim bài Kudo của bạn",
				gift: "Bạn vừa nhận một Secret Box",
				system: "Thông báo hệ thống",
			},
			sampleMessages: {
				kudo: "Trần Văn Khang đã gửi bạn một lời cảm ơn với #Teamwork",
				heart: "Phạm Thanh Mai và 4 người khác đã thả tim Kudo của bạn",
				gift: "Mở ngay để biết phần thưởng bên trong!",
				system: "Lễ trao giải SAA 2025 sẽ diễn ra vào 18:00 ngày 26/12.",
			},
		},
		kudosRulesModal: {
			title: "Thể lệ Sun* Kudos 2025",
			intro: "Sun* Kudos là phong trào ghi nhận lời cảm ơn dành cho tất cả Sunner trong khuôn khổ SAA 2025. Hãy dành tặng những lời cảm ơn chân thành tới đồng đội đã đồng hành cùng bạn suốt năm qua.",
			rewardsTitle: "Phần thưởng",
			rewards: [
				"Mỗi Sunner có thể gửi và nhận không giới hạn số lượng Kudos.",
				"Kudos được highlight trên Live Board khi nhận đủ số lượt tim quy định.",
				"Sunner tích cực nhất mỗi tuần sẽ được tặng Secret Box ngẫu nhiên.",
				"TOP 3 Sunner nhận được nhiều Kudos nhất trong kỳ sẽ nhận quà đặc biệt tại lễ trao giải 26/12/2025.",
			],
			badgesTitle: "Danh hiệu",
			badges: [
				{ icon: "🌱", name: "New Hero" },
				{ icon: "🌿", name: "Rising Hero" },
				{ icon: "🌳", name: "Super Hero" },
				{ icon: "🌟", name: "Legend Hero" },
				{ icon: "💎", name: "Signature Creator" },
				{ icon: "🔥", name: "MVP" },
			],
			close: "Đóng",
			writeKudoCta: "Viết KUDOS",
		},
		writeKudoModal: {
			title: "Gửi lời cám ơn và ghi nhận đến đồng đội",
			close: "Đóng",
			recipientLabel: "Người nhận",
			recipientPlaceholder: "Tìm kiếm",
			contentPlaceholder: "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!",
			contentHint: "Bạn có thể \"@ + tên\" để nhắc tới đồng nghiệp khác",
			hashtagLabel: "Hashtag",
			hashtagAdd: "+ Hashtag",
			maxHashtags: "Tối đa 5",
			imageLabel: "Image",
			imageAdd: "+ Image",
			maxImages: "Tối đa 5",
			anonymousToggle: "Gửi lời cám ơn và ghi nhận ẩn danh",
			anonymousNamePlaceholder: "Tên hiển thị ẩn danh",
			cancel: "Hủy",
			submit: "Gửi",
			submittedAlert: "Kudo của bạn đã được ghi nhận!",
			validationMissing: "Vui lòng điền đầy đủ người nhận, nội dung và hashtag.",
		},
		countdownPage: {
			title: "Sắp diễn ra",
			subtitle: "SAA 2025 sẽ mở đăng ký trong",
			eventLabel: "26/12/2025 · Âu Cơ Art Center",
			openCta: "Vào SAA 2025",
		},
		comingSoonPage: {
			title: "Sắp ra mắt",
			description: "Trang này đang trong quá trình hoàn thiện và sẽ sớm có mặt. Hãy quay lại sau nhé!",
			backToDashboard: "Quay về trang chủ",
		},
		kudosPage: {
			bannerTitle: "Hệ thống ghi nhận lời cảm ơn",
			bannerSubtitle: "SAA 2025 KUDOS",
			writePlaceholder: "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?",
			writeComingSoon: "Tính năng gửi Kudo sẽ sớm ra mắt!",
			highlightSubtitle: "Sun* Annual Awards 2025",
			highlightTitle: "HIGHLIGHT KUDOS",
			allKudosSubtitle: "Sun* Annual Awards 2025",
			allKudosTitle: "ALL KUDOS",
			spotlightSubtitle: "Sun* Annual Awards 2025",
			spotlightTitle: "SPOTLIGHT BOARD",
			spotlightComingSoon: "Spotlight board sẽ sớm có mặt.",
			emptyFeed: "Hiện tại chưa có Kudos nào.",
			copyLink: "Copy Link",
			linkCopied: "Link copied — ready to share!",
			viewDetail: "Xem chi tiết",
			anonymous: "Ẩn danh",
			sidebar: {
				title: "Thống kê của bạn",
				kudosReceived: "Số Kudos bạn nhận được",
				kudosSent: "Số Kudos bạn đã gửi",
				heartsReceived: "Số tim bạn nhận được",
				heartsGiven: "Số tim bạn đã thả",
				secretBoxes: "Secret Box chưa mở",
				secretBoxesOpened: "Secret Box đã mở",
				openGift: "Mở quà",
				recentRankings: "10 Sunner có sự thăng hạng mới nhất",
				recentGifts: "10 Sunner nhận quà mới nhất",
				noData: "Chưa có dữ liệu",
			},
		},
		homepage: {
			nav: {
				aboutSAA: "About SAA 2025",
				awardsInfo: "Awards Information",
				sunKudos: "Sun* Kudos",
				standards: "Tiêu chuẩn chung",
				notifications: "Thông báo",
			},
			hero: {
				comingSoon: "Sắp diễn ra",
				aboutAwards: "Hệ thống giải thưởng",
				aboutKudos: "Sun* Kudos",
			},
			countdown: {
				days: "Ngày",
				hours: "Giờ",
				minutes: "Phút",
			},
			eventInfo: {
				dateLabel: "Thời gian:",
				dateValue: "26/12/2025",
				venueLabel: "Địa điểm:",
				venueValue: "Âu Cơ Art Center",
				livestreamNote: "Tường thuật trực tiếp qua sóng Livestream",
			},
			rootFurther: {
				quote: "\u201CA tree with deep roots fears no storm\u201D\n(C\u00e2y s\u00e2u b\u00e9n r\u1ec5, b\u00e3o gi\u00f4ng ch\u1eb3ng n\u1ec1 \u2013 Ng\u1ea1n ng\u1eef Anh)",
				paragraph1: "\u0110\u1ee9ng tr\u01b0\u1edbc b\u1ed1i c\u1ea3nh thay \u0111\u1ed5i nh\u01b0 v\u0169 b\u00e3o c\u1ee7a th\u1eddi \u0111\u1ea1i AI v\u00e0 y\u00eau c\u1ea7u ng\u00e0y c\u00e0ng cao t\u1eeb kh\u00e1ch h\u00e0ng, Sun* l\u1ef1a ch\u1ecdn chi\u1ebfn l\u01b0\u1ee3c \u0111a d\u1ea1ng h\u00f3a n\u0103ng l\u1ef1c \u0111\u1ec3 kh\u00f4ng ch\u1ec9 n\u1ed7 l\u1ef1c tr\u1edf th\u00e0nh tinh anh trong l\u0129nh v\u1ef1c c\u1ee7a m\u00ecnh, m\u00e0 c\u00f2n h\u01b0\u1edbng \u0111\u1ebfn m\u1ed9t c\u00e1i \u0111\u00edch cao h\u01a1n, n\u01a1i m\u1ecdi Sunner \u0111\u1ec1u l\u00e0\u00a0\u201cproblem-solver\u201d\u00a0\u2013 chuy\u00ean gia trong vi\u1ec7c gi\u1ea3i quy\u1ebft m\u1ecdi v\u1ea5n \u0111\u1ec1, t\u00ecm l\u1eddi gi\u1ea3i cho m\u1ecdi b\u00e0i to\u00e1n c\u1ee7a d\u1ef1 \u00e1n, kh\u00e1ch h\u00e0ng v\u00e0 x\u00e3 h\u1ed9i.\nL\u1ea5y c\u1ea3m h\u1ee9ng t\u1eeb s\u1ef1 \u0111a d\u1ea1ng n\u0103ng l\u1ef1c, kh\u1ea3 n\u0103ng ph\u00e1t tri\u1ec3n linh ho\u1ea1t c\u00f9ng tinh th\u1ea7n \u0111\u00e0o s\u00e2u \u0111\u1ec3 b\u1ee9t ph\u00e1 trong k\u1ef7 nguy\u00ean AI,\u00a0\u201cRoot Further\u201d\u00a0\u0111\u00e3 \u0111\u01b0\u1ee3c ch\u1ecdn \u0111\u1ec3 tr\u1edf th\u00e0nh ch\u1ee7 \u0111\u1ec1 ch\u00ednh th\u1ee9c c\u1ee7a L\u1ec5 trao gi\u1ea3i Sun* Annual Awards 2025.\nV\u01b0\u1ee3t ra kh\u1ecfi n\u00e9t ngh\u0129a b\u1ec1 m\u1eb7t,\u00a0\u201cRoot Further\u201d\u00a0ch\u00ednh l\u00e0 h\u00e0nh tr\u00ecnh ch\u00fang ta kh\u00f4ng ng\u1eebng v\u01b0\u01a1n xa h\u01a1n, c\u1eafm r\u1ec5 m\u1ea1nh h\u01a1n, ch\u1ea1m \u0111\u1ebfn nh\u1eefng t\u1ea7ng \u201c\u0111\u1ecba ch\u1ea5t\u201d \u1ea9n s\u00e2u \u0111\u1ec3 ti\u1ebfp t\u1ee5c t\u1ed3n t\u1ea1i, v\u01b0\u01a1n l\u00ean v\u00e0 nu\u00f4i d\u01b0\u1ee1ng \u0111am m\u00ea ki\u1ebfn t\u1ea1o gi\u00e1 tr\u1ecb lu\u00f4n ch\u00e1y b\u1ecfng c\u1ee7a ng\u01b0\u1eddi Sun*. M\u01b0\u1ee3n h\u00ecnh \u1ea3nh b\u1ed9 r\u1ec5 li\u00ean t\u1ee5c \u0111\u00e2m s\u00e2u v\u00e0o l\u00f2ng \u0111\u1ea5t, m\u1ea1nh m\u1ebd len l\u1ecfi qua t\u1eebng l\u1edbp \u201ctr\u1ea7m t\u00edch\u201d \u0111\u1ec3 th\u1ea9m th\u1ea5u nh\u1eefng g\u00ec tinh tu\u00fd nh\u1ea5t, ng\u01b0\u1eddi Sun* c\u0169ng \u0111ang \u201ch\u1ea5p th\u1ee5\u201d d\u01b0\u1ee1ng ch\u1ea5t t\u1eeb th\u1eddi \u0111\u1ea1i v\u00e0 nh\u1eefng th\u1eed th\u00e1ch c\u1ee7a th\u1ecb tr\u01b0\u1eddng \u0111\u1ec3 l\u00e0m m\u1edbi m\u00ecnh m\u1ed7i ng\u00e0y, m\u1edf r\u1ed9ng n\u0103ng l\u1ef1c v\u00e0 m\u1ea1nh m\u1ebd \u201cb\u00e9n r\u1ec5\u201d v\u00e0o\u00a0k\u1ef7 nguy\u00ean AI\u00a0\u2013 m\u1ed9t t\u1ea7ng \u201c\u0111\u1ecba ch\u1ea5t\u201d ho\u00e0n to\u00e0n m\u1edbi, ph\u1ee9c t\u1ea1p v\u00e0 kh\u00f3 \u0111o\u00e1n, nh\u01b0ng c\u0169ng h\u1ed9i t\u1ee5 v\u00f4 v\u00e0n ti\u1ec1m n\u0103ng c\u00f9ng c\u01a1 h\u1ed9i.",
				paragraph2: "Tr\u01b0\u1edbc gi\u00f4ng b\u00e3o, ch\u1ec9 nh\u1eefng t\u00e1n c\u00e2y c\u00f3 b\u1ed9 r\u1ec5 \u0111\u1ee7 m\u1ea1nh m\u1edbi c\u00f3 th\u1ec3 tr\u1ee5 v\u1eefng. M\u1ed9t t\u1ed5 ch\u1ee9c v\u1edbi nh\u1eefng c\u00e1 nh\u00e2n t\u1ef1 tin v\u00e0o n\u0103ng l\u1ef1c \u0111a d\u1ea1ng, s\u1eb5n s\u00e0ng ki\u1ebfn t\u1ea1o v\u00e0 \u0111\u00f3n nh\u1eadn th\u1eed th\u00e1ch, l\u00e0m ch\u1ee7 s\u1ef1 thay \u0111\u1ed5i l\u00e0 t\u1ed5 ch\u1ee9c kh\u00f4ng ch\u1ec9 v\u1eefng v\u00e0ng tr\u01b0\u1edbc bi\u1ebfn \u0111\u1ed9ng, m\u00e0 c\u00f2n khai th\u00e1c \u0111\u01b0\u1ee3c m\u1ecdi l\u1ee3i th\u1ebf, chinh ph\u1ee5c c\u00e1c th\u00e1ch th\u1ee9c c\u1ee7a th\u1eddi cu\u1ed9c. Kh\u00f4ng \u0111\u01a1n thu\u1ea7n l\u00e0 t\u00ean g\u1ecdi c\u1ee7a ch\u01b0\u01a1ng m\u1edbi tr\u00ean h\u00e0nh tr\u00ecnh ph\u00e1t tri\u1ec3n t\u1ed5 ch\u1ee9c,\u00a0\u201cRoot Further\u201d\u00a0c\u00f2n nh\u01b0 m\u1ed9t l\u1eddi c\u1ed5 v\u0169, \u0111\u1ed9ng vi\u00ean m\u1ed7i ch\u00fang ta h\u00e3y d\u00e1m tin v\u00e0o b\u1ea3n th\u00e2n, d\u00e1m \u0111\u00e0o s\u00e2u, khai m\u1edf m\u1ecdi ti\u1ec1m n\u0103ng, d\u00e1m ph\u00e1 b\u1ecf gi\u1edbi h\u1ea1n, d\u00e1m tr\u1edf th\u00e0nh phi\u00ean b\u1ea3n \u0111a nhi\u1ec7m v\u00e0 xu\u1ea5t s\u1eafc nh\u1ea5t c\u1ee7a m\u00ecnh. B\u1edfi trong th\u1eddi \u0111\u1ea1i AI, \u0111a d\u1ea1ng n\u0103ng l\u1ef1c v\u00e0 t\u1eadn d\u1ee5ng s\u1ee9c m\u1ea1nh th\u1eddi cu\u1ed9c ch\u00ednh l\u00e0 \u0111i\u1ec1u ki\u1ec7n ti\u00ean quy\u1ebft \u0111\u1ec3 tr\u01b0\u1eddng t\u1ed3n.\nKh\u00f4ng ai bi\u1ebft tr\u01b0\u1edbc \u1ea9n s\u00e2u trong \u201cl\u00f2ng \u0111\u1ea5t\u201d c\u1ee7a ng\u00e0nh c\u00f4ng ngh\u1ec7 v\u00e0 th\u1ecb tr\u01b0\u1eddng hi\u1ec7n \u0111\u1ea1i c\u00f2n bi\u1ebft bao t\u1ea7ng \u201c\u0111\u1ecba ch\u1ea5t\u201d b\u00ed \u1ea9n. Ch\u1ec9 bi\u1ebft r\u1eb1ng khi\u00a0\u201cRoot Further\u201d\u00a0\u0111\u00e3 tr\u1edf th\u00e0nh tinh th\u1ea7n c\u1ed9i r\u1ec5, ch\u00fang ta s\u1ebd kh\u00f4ng s\u1ee3 h\u00e3i, m\u00e0 c\u00e0ng th\u1ea5y h\u00e1o h\u1ee9c tr\u01b0\u1edbc b\u1ea5t c\u1ee9 v\u00f9ng v\u00f4 \u0111\u1ecbnh n\u00e0o tr\u00ean h\u00e0nh tr\u00ecnh ti\u1ebfn v\u1ec1 ph\u00eda tr\u01b0\u1edbc. V\u00ec ta lu\u00f4n tin r\u1eb1ng, trong ch\u00ednh nh\u1eefng mi\u1ec1n v\u00f4 t\u1eadn \u0111\u00f3, l\u00e0 bao \u0111i\u1ec1u k\u1ef3 di\u1ec7u v\u00e0 c\u01a1 h\u1ed9i v\u01b0\u01a1n m\u00ecnh \u0111ang ch\u1edd ta.",
				paragraph3: "",
			},
			awards: {
				caption: "Sun* annual awards 2025",
				title: "Hệ thống giải thưởng",
				description: "Các hạng mục sẽ được trao giải theo TOP những người xuất sắc nhất.",
				detailLink: "Chi tiết",
			},
			topTalent: {
				title: "Top Talent",
				description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
			},
			topProject: {
				title: "Top Project",
				description: "Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi bật",
			},
			topProjectLeader: {
				title: "Top Project Leader",
				description: "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá",
			},
			bestManager: {
				title: "Best Manager",
				description: "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
			},
			signatureCreator: {
				title: "Signature 2025 - Creator",
				description: "Vinh danh người sáng tạo đột phá trong năm 2025",
			},
			mvp: {
				title: "MVP (Most Valuable Person)",
				description: "Vinh danh cá nhân có đóng góp giá trị nhất",
			},
			kudos: {
				label: "Phong trào ghi nhận",
				title: "Sun* Kudos",
				description: "ĐIỂM MỚI CỦA SAA 2025\nHoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra dành cho tất cả Sunner.",
				detailButton: "Chi tiết",
				highlight: "ĐIỂM MỚI CỦA SAA 2025",
			},
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
			errorUnauthorized: "This email is not allowed. Please use a Sun* email address.",
			errorSessionExpired: "Your session has expired. Please log in again.",
			errorAuthFailed: "Login failed. Please try again.",
			errorMissingCode: "Missing authentication code. Please try again.",
		},
		footer: {
			copyright: "Copyright Sun* © 2025",
		},
		dashboard: {
			welcome: "Welcome to SAA 2025",
			loggedInAs: "Logged in as:",
			logout: "Logout",
		},
		profileDropdown: {
			triggerAriaLabel: "Open account menu",
			menuAriaLabel: "Account menu",
			profile: "Profile",
			logout: "Logout",
			loggingOut: "Signing out...",
		},
		awardsPage: {
			bannerTitle: "ROOT FURTHER - Sun* Annual Award 2025",
			caption: "Sun* annual awards 2025",
			pageTitle: "SAA 2025 Award Categories",
			quantityLabel: "Number of awards:",
			valueLabel: "Prize value:",
			unitIndividual: "Individual",
			unitTeam: "Team",
			unitBoth: "Individual or team",
			prizeNoteEach: "per award",
			prizeNoteIndTeam: "for individual / team",
			descriptions: {
				topTalent: "The Top Talent award honors exceptional individuals who excel across every dimension — strong technical expertise, outstanding performance, and consistent delivery of value beyond expectations. They inspire their teammates, take on any mission, and positively influence the whole organization.",
				topProject: "The Top Project award honors outstanding project teams with business results exceeding expectations, optimal operational efficiency, and dedicated teamwork. These projects feature high technical complexity, strong resource optimization, impactful client proposals, and remarkable client satisfaction.",
				topProjectLeader: "The Top Project Leader award honors inspiring project managers who combine solid leadership with the ability to motivate, embodying the \"Aim High – Be Agile\" mindset. Under their guidance, teams overcome challenges, hit targets, and grow into more capable — and happier — versions of themselves.",
				bestManager: "The Best Manager award honors exemplary leaders who guide their teams to results that exceed expectations, generate significant business impact, and contribute to sustainable growth. They empower teams through multi-skill execution, effective collaboration, and flexible application of technology in the digital era.",
				signatureCreator: "The Signature award honors individuals or teams who embody the spirit Sun* prioritizes in each period. In 2025, the Signature — Creator award honors proactive, perceptive people who find opportunity in challenge and take pioneering action.",
				mvp: "The MVP award honors the most outstanding individual of the year — a defining face of Sun*. They demonstrate superior capability, unwavering dedication, and deep influence, leaving a strong imprint on Sun*'s journey throughout the year.",
			},
		},
		fab: {
			openMenu: "Open quick menu",
			closeMenu: "Close quick menu",
			rules: "Rules",
			writeKudo: "Write KUDOS",
			cancel: "Cancel",
		},
		notificationPanel: {
			triggerAriaLabel: "View notifications",
			panelTitle: "Notifications",
			markAllRead: "Mark all as read",
			viewAll: "View all",
			empty: "No notifications yet",
			timeJustNow: "Just now",
			timeMinutes: "{n} minutes ago",
			timeHours: "{n} hours ago",
			timeDays: "{n} days ago",
			sampleTitles: {
				kudo: "You received a new Kudo",
				heart: "Someone hearted your Kudo",
				gift: "You received a Secret Box",
				system: "System announcement",
			},
			sampleMessages: {
				kudo: "Trần Văn Khang sent you a thank-you with #Teamwork",
				heart: "Phạm Thanh Mai and 4 others hearted your Kudo",
				gift: "Open now to see your reward!",
				system: "The SAA 2025 award ceremony is on Dec 26 at 6 PM.",
			},
		},
		kudosRulesModal: {
			title: "Sun* Kudos 2025 Rules",
			intro: "Sun* Kudos is a recognition movement for all Sunners as part of SAA 2025. Share heartfelt thank-you messages with teammates who walked with you this year.",
			rewardsTitle: "Rewards",
			rewards: [
				"Every Sunner can send and receive unlimited kudos.",
				"Kudos are highlighted on the Live Board once they reach the heart threshold.",
				"The most active Sunner each week receives a random Secret Box.",
				"The TOP 3 Sunners with the most kudos in a period receive special gifts at the award ceremony on December 26, 2025.",
			],
			badgesTitle: "Badges",
			badges: [
				{ icon: "🌱", name: "New Hero" },
				{ icon: "🌿", name: "Rising Hero" },
				{ icon: "🌳", name: "Super Hero" },
				{ icon: "🌟", name: "Legend Hero" },
				{ icon: "💎", name: "Signature Creator" },
				{ icon: "🔥", name: "MVP" },
			],
			close: "Close",
			writeKudoCta: "Write KUDOS",
		},
		writeKudoModal: {
			title: "Send kudos to your teammates",
			close: "Close",
			recipientLabel: "Recipient",
			recipientPlaceholder: "Search",
			contentPlaceholder: "Share your kudos message here!",
			contentHint: "Use \"@ + name\" to mention a colleague",
			hashtagLabel: "Hashtag",
			hashtagAdd: "+ Hashtag",
			maxHashtags: "Max 5",
			imageLabel: "Image",
			imageAdd: "+ Image",
			maxImages: "Max 5",
			anonymousToggle: "Send kudos anonymously",
			anonymousNamePlaceholder: "Anonymous display name",
			cancel: "Cancel",
			submit: "Submit",
			submittedAlert: "Your kudo has been recorded!",
			validationMissing: "Please fill recipient, content, and hashtag.",
		},
		countdownPage: {
			title: "Coming soon",
			subtitle: "SAA 2025 opens in",
			eventLabel: "Dec 26, 2025 · Au Co Art Center",
			openCta: "Enter SAA 2025",
		},
		comingSoonPage: {
			title: "Coming soon",
			description: "This page is under construction and will be available soon. Check back later!",
			backToDashboard: "Back to dashboard",
		},
		kudosPage: {
			bannerTitle: "Kudos Recognition System",
			bannerSubtitle: "SAA 2025 KUDOS",
			writePlaceholder: "Who would you like to thank today?",
			writeComingSoon: "Kudo submission is coming soon!",
			highlightSubtitle: "Sun* Annual Awards 2025",
			highlightTitle: "HIGHLIGHT KUDOS",
			allKudosSubtitle: "Sun* Annual Awards 2025",
			allKudosTitle: "ALL KUDOS",
			spotlightSubtitle: "Sun* Annual Awards 2025",
			spotlightTitle: "SPOTLIGHT BOARD",
			spotlightComingSoon: "Spotlight board is coming soon.",
			emptyFeed: "No kudos yet.",
			copyLink: "Copy Link",
			linkCopied: "Link copied — ready to share!",
			viewDetail: "View detail",
			anonymous: "Anonymous",
			sidebar: {
				title: "Your stats",
				kudosReceived: "Kudos received",
				kudosSent: "Kudos sent",
				heartsReceived: "Hearts received",
				heartsGiven: "Hearts given",
				secretBoxes: "Unopened secret boxes",
				secretBoxesOpened: "Opened secret boxes",
				openGift: "Open gift",
				recentRankings: "10 Sunners with newest promotions",
				recentGifts: "10 Sunners who just received gifts",
				noData: "No data yet",
			},
		},
		homepage: {
			nav: {
				aboutSAA: "About SAA 2025",
				awardsInfo: "Awards Information",
				sunKudos: "Sun* Kudos",
				standards: "General Standards",
				notifications: "Notifications",
			},
			hero: {
				comingSoon: "Coming soon",
				aboutAwards: "Award Categories",
				aboutKudos: "Sun* Kudos",
			},
			countdown: {
				days: "Days",
				hours: "Hours",
				minutes: "Minutes",
			},
			eventInfo: {
				dateLabel: "Date:",
				dateValue: "Dec 26, 2025",
				venueLabel: "Venue:",
				venueValue: "Au Co Art Center",
				livestreamNote: "Live streaming available",
			},
			rootFurther: {
				quote: "A tree with deep roots fears no storm",
				paragraph1: "In the era of AI transforming every industry, Sun* remains steadfast in its sustainable growth strategy — investing in people, nurturing a culture of creativity, and building a solid foundation to reach further.",
				paragraph2: "ROOT FURTHER is a reminder that every great achievement originates from deep, enduring roots — from the relentless effort of every Sunner.",
				paragraph3: "SAA 2025 is an occasion for us to look back on our journey, honor outstanding contributions, and continue to root deeper on the road ahead.",
			},
			awards: {
				caption: "Sun* annual awards 2025",
				title: "Award Categories",
				description: "Categories awarded to the TOP outstanding individuals.",
				detailLink: "Details",
			},
			topTalent: {
				title: "Top Talent",
				description: "Honoring the top outstanding individuals in every aspect",
			},
			topProject: {
				title: "Top Project",
				description: "Honoring outstanding projects in every aspect, including those with remarkable revenue",
			},
			topProjectLeader: {
				title: "Top Project Leader",
				description: "Honoring inspiring managers who lead projects to breakthrough success",
			},
			bestManager: {
				title: "Best Manager",
				description: "Honoring managers with excellent leadership skills who guide their teams",
			},
			signatureCreator: {
				title: "Signature 2025 - Creator",
				description: "Honoring breakthrough creators in 2025",
			},
			mvp: {
				title: "MVP (Most Valuable Person)",
				description: "Honoring the individual with the most valuable contribution",
			},
			kudos: {
				label: "Recognition Movement",
				title: "Sun* Kudos",
				description: "NEW IN SAA 2025\nRecognize and thank your colleagues — the first time this activity is available for all Sunners.",
				detailButton: "Details",
				highlight: "NEW IN SAA 2025",
			},
		},
	},
};
