import { KeyRound } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { WHATSAPP_MESSAGES } from "@/config/contact";
import { ACCOUNT_SECTION_IDS } from "@/config/navigation";
import { AdminHelp } from "./admin-help";
import { ChangePasswordForm } from "./change-password-form";

export function SecurityCard({ canEdit }: { canEdit: boolean }) {
  return (
    <BentoCard
      id={ACCOUNT_SECTION_IDS.security}
      title="Keamanan Akun"
      description="Jaga kerahasiaan kata sandi Anda. Admin tidak pernah memintanya."
      className="scroll-mt-6"
    >
      {canEdit ? (
        <ChangePasswordForm />
      ) : (
        <>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong"
            >
              <KeyRound className="h-4 w-4" />
            </span>
            <div>
              <p className="font-heading text-sm font-medium text-ink">
                Kata sandi
              </p>
              <p className="text-xs text-muted">••••••••</p>
            </div>
          </div>
          <AdminHelp
            text="Atur ulang kata sandi saat ini dibantu admin."
            label="Minta atur ulang"
            message={WHATSAPP_MESSAGES.forgotPassword}
          />
        </>
      )}
    </BentoCard>
  );
}
