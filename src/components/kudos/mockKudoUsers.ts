import type { KudoUser } from "@/components/kudos/mockKudos";

function user(id: string, name: string, department: string): KudoUser {
	const initials = name
		.split(" ")
		.map((p) => p[0])
		.slice(-2)
		.join("")
		.toUpperCase();
	return { id, name, initials, department };
}

export const mockKudoUsers: KudoUser[] = [
	user("u1", "Nguyễn Thị Hoa", "Product"),
	user("u2", "Trần Văn Khang", "Engineering"),
	user("u3", "Phạm Thanh Mai", "Design"),
	user("u4", "Lê Minh Bảo", "Engineering"),
	user("u5", "Vũ Mỹ Linh", "Marketing"),
	user("u6", "Bùi Diễm Thảo", "HR"),
	user("u7", "Đinh Quốc Đức", "Operations"),
	user("u8", "Lý Thanh Tiến", "Engineering"),
	user("u9", "Nguyễn Quang Huy", "Engineering"),
	user("u10", "Trịnh Bảo Châu", "Product"),
];
