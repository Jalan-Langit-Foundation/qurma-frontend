import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandBar, BrandLogo, HelpLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { ROUTES } from "@/config/navigation";

export function AuthTopBar() {
  return (
    <BrandBar
      start={
        <Link
          href={ROUTES.home}
          aria-label="Kembali ke beranda"
          className={buttonClassName({
            variant: "soft",
            size: "pill",
            className: "border-slate-200/80 px-3 sm:pr-5 sm:pl-3.5",
          })}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Kembali ke beranda</span>
        </Link>
      }
      center={
        <Link href={ROUTES.home} className="block rounded-lg focus-ring">
          <BrandLogo alt="QURMA – kembali ke beranda" eager />
        </Link>
      }
      end={<HelpLink />}
    />
  );
}
