export interface KudoUser {
	id: string;
	name: string;
	initials: string;
	department: string;
}

export interface Kudo {
	id: string;
	sender: KudoUser | null;
	anonymousName?: string;
	recipients: KudoUser[];
	content: string;
	hashtags: string[];
	createdAt: string;
	heartCount: number;
	isHighlighted: boolean;
}

function user(id: string, name: string, department: string): KudoUser {
	const initials = name
		.split(" ")
		.map((p) => p[0])
		.slice(-2)
		.join("")
		.toUpperCase();
	return { id, name, initials, department };
}

const U = {
	hoa: user("u1", "Nguyễn Thị Hoa", "Product"),
	khang: user("u2", "Trần Văn Khang", "Engineering"),
	mai: user("u3", "Phạm Thanh Mai", "Design"),
	bao: user("u4", "Lê Minh Bảo", "Engineering"),
	linh: user("u5", "Vũ Mỹ Linh", "Marketing"),
	thao: user("u6", "Bùi Diễm Thảo", "HR"),
	duc: user("u7", "Đinh Quốc Đức", "Operations"),
	tien: user("u8", "Lý Thanh Tiến", "Engineering"),
};

export const mockKudos: Kudo[] = [
	{
		id: "k1",
		sender: U.hoa,
		recipients: [U.khang, U.bao],
		content:
			"Cảm ơn hai bạn đã support team mình sprint vừa rồi. Nhờ code review kịp thời mà mình không block được task quan trọng của khách hàng. Thật sự biết ơn!",
		hashtags: ["Dedicated", "Teamwork", "Kaizen"],
		createdAt: "2026-04-21T10:00:00+07:00",
		heartCount: 28,
		isHighlighted: true,
	},
	{
		id: "k2",
		sender: U.mai,
		recipients: [U.linh],
		content:
			"Linh ơi, bài share về UX writing của bạn tuần trước cực kỳ hữu ích. Mình đã apply ngay vào màn login và copy conversion tăng 12% 🎉",
		hashtags: ["Inspiring", "KnowledgeSharing"],
		createdAt: "2026-04-21T14:30:00+07:00",
		heartCount: 21,
		isHighlighted: true,
	},
	{
		id: "k3",
		sender: null,
		anonymousName: "Một người Sunner",
		recipients: [U.thao],
		content:
			"Cảm ơn chị vì buổi 1:1 hôm qua. Em đã lo lắng rất nhiều về lộ trình sắp tới nhưng chị đã giúp em nhìn rõ ràng hơn. Chị là một HRBP tuyệt vời!",
		hashtags: ["Caring", "LeadershipByExample"],
		createdAt: "2026-04-20T16:45:00+07:00",
		heartCount: 18,
		isHighlighted: true,
	},
	{
		id: "k4",
		sender: U.duc,
		recipients: [U.tien, U.bao, U.khang],
		content:
			"Cảm ơn team DevOps đã trực đêm qua để rollout prod. Không ai xứng đáng với giấc ngủ hơn ba bạn lúc này! 💪",
		hashtags: ["Teamwork", "GoTheExtraMile"],
		createdAt: "2026-04-20T09:12:00+07:00",
		heartCount: 14,
		isHighlighted: false,
	},
	{
		id: "k5",
		sender: U.linh,
		recipients: [U.mai],
		content:
			"Mai vẽ key visual cho chiến dịch mới đẹp quá trời. Client gửi lời khen ngay sau khi xem bản đầu tiên!",
		hashtags: ["Creative", "Signature2025"],
		createdAt: "2026-04-19T18:20:00+07:00",
		heartCount: 11,
		isHighlighted: false,
	},
	{
		id: "k6",
		sender: U.bao,
		recipients: [U.hoa],
		content:
			"Hoa viết PRD lần này quá rõ ràng, dev team mình đọc một lần là vào việc luôn. Thật sự là một Product Manager tâm huyết.",
		hashtags: ["Dedicated", "Clarity"],
		createdAt: "2026-04-19T11:05:00+07:00",
		heartCount: 9,
		isHighlighted: false,
	},
	{
		id: "k7",
		sender: U.khang,
		recipients: [U.duc, U.tien],
		content:
			"Cảm ơn hai anh đã maintain pipeline CI/CD suốt cả năm qua. Mỗi commit của mình deploy trôi chảy là nhờ các anh!",
		hashtags: ["Reliability", "BehindTheScenes"],
		createdAt: "2026-04-18T15:40:00+07:00",
		heartCount: 7,
		isHighlighted: false,
	},
	{
		id: "k8",
		sender: U.thao,
		recipients: [U.hoa, U.mai, U.linh],
		content:
			"Rất tự hào khi thấy ba bạn nữ tiên phong trong buổi tech talk Women in Tech tuần trước. Truyền cảm hứng cho rất nhiều junior của Sun*!",
		hashtags: ["Inspiring", "DiversityAndInclusion"],
		createdAt: "2026-04-18T09:00:00+07:00",
		heartCount: 6,
		isHighlighted: false,
	},
];

export const mockUserStats = {
	kudosReceived: 0,
	kudosSent: 0,
	heartsReceived: 0,
	heartsGiven: 0,
	secretBoxes: 0,
	secretBoxesOpened: 0,
};
