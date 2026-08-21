"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import clsx from "clsx";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleLocaleChange = (newLocale: "en" | "hi") => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript may complain about dynamic params, but this is safe
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-1 bg-[#1A1628]/60 backdrop-blur-md border border-[#C9A84C]/20 rounded-full p-1",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <button
        onClick={() => handleLocaleChange("en")}
        disabled={isPending || locale === "en"}
        className={clsx(
          "px-3 py-1 rounded-full text-xs font-medium transition-colors",
          locale === "en"
            ? "bg-[#C9A84C] text-[#0D0B1A]"
            : "text-[#E8E4F0] hover:text-[#C9A84C]"
        )}
      >
        English
      </button>
      <div className="w-px h-4 bg-[#C9A84C]/30 mx-1"></div>
      <button
        onClick={() => handleLocaleChange("hi")}
        disabled={isPending || locale === "hi"}
        className={clsx(
          "px-3 py-1 rounded-full text-xs font-medium transition-colors",
          locale === "hi"
            ? "bg-[#C9A84C] text-[#0D0B1A]"
            : "text-[#E8E4F0] hover:text-[#C9A84C]"
        )}
      >
        हिन्दी
      </button>
    </div>
  );
}