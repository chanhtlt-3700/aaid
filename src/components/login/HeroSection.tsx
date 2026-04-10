import Image from "next/image";
import { GoogleLoginButton } from "@/components/login/GoogleLoginButton";

export function HeroSection() {
	return (
		<div className="mx-auto flex w-full max-w-[1224px] flex-col gap-10 px-3 sm:px-6 md:px-8 xl:px-0 2xl:gap-30">
			{/* ROOT FURTHER logo */}
			<div className="relative flex items-center">
				<Image
					src="/assets/login/logos/root-further.png"
					alt="ROOT FURTHER"
					width={451}
					height={200}
					priority
					className="h-full max-h-30 w-auto object-contain object-left sm:max-h-40 lg:max-h-[unset] lg:w-[451px]"
				/>
			</div>

			{/* Text + Button */}
			<div className="flex flex-col gap-6">
				<p className="font-montserrat text-base font-normal leading-8 tracking-[0.5px] text-white sm:max-w-[480px] sm:text-xl sm:leading-10">
					Bắt đầu hành trình của bạn cùng SAA 2025.
					<br />
					Đăng nhập để khám phá!
				</p>

				<GoogleLoginButton />
			</div>
		</div>
	);
}
