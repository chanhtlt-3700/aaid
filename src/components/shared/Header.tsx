import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { HeaderNav } from "@/components/shared/HeaderNav";
import { HeaderLogo } from "@/components/shared/HeaderLogo";

interface HeaderProps {
  variant?: "minimal" | "full";
}

export function Header({ variant = "minimal" }: HeaderProps) {
  return (
    <header
      className="absolute top-0 z-10 w-full"
      style={{ background: "rgba(16, 20, 23, 0.8)", zIndex: 100 }}
    >
      <div className="mx-auto flex w-full max-w-[1224px] items-center justify-between px-3 py-3 sm:px-6 md:px-8 xl:px-0">
        <div className="flex items-center gap-16">
          <HeaderLogo />
          {variant === "full" && <HeaderNav />}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
