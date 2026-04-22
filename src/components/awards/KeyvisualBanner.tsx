"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export function KeyvisualBanner() {
  const { t } = useLanguage();

  return (
    <section
      className="relative  h-[320px] w-full overflow-hidden md:h-[400px]"
      aria-label={t.awardsPage.bannerTitle}
    >
      <Image
        src="/assets/login/images/key-visual.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,16,26,0) 0%, rgba(0,16,26,0.4) 60%, #00101A 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-3 pb-12 sm:px-6 md:px-8 lg:px-36">
        <Image
          src="/assets/login/logos/root-further.png"
          alt="ROOT FURTHER"
          width={360}
          height={160}
          className="h-20 w-auto md:h-28 lg:h-32"
          priority
        />
      </div>
    </section>
  );
}
