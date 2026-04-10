import Image from "next/image";

export function Header() {
	return (
		<header className="absolute top-0 z-10 w-full" style={{ background: "rgba(11, 15, 18, 0.8)" }}>
			<div className="mx-auto flex w-full max-w-[1224px] items-center justify-between px-3 py-3 sm:px-6 md:px-8 xl:px-0">
				<Image
					src="/assets/login/logos/saa-logo.png"
					alt="SAA 2025"
					width={52}
					height={48}
					className="h-9 w-10 md:h-11 md:w-12 lg:h-12 lg:w-[52px]"
				/>
				<button
					type="button"
					aria-label="Select language"
					className="flex items-center gap-0.5 rounded px-4 py-4 transition-colors duration-150 hover:cursor-pointer hover:bg-white/10"
				>
					<span className="flex h-6 w-6 items-center justify-center">
						<Image
							src="/assets/login/icons/vn-flag.svg"
							alt="Vietnam flag"
							width={20}
							height={15}
						/>
					</span>
					<span className="hidden font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white min-[480px]:inline">
						VN
					</span>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" />
					</svg>
				</button>
			</div>
		</header>
	);
}
