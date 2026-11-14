import { BentoCard } from "@/components/ui/bento-card";
import { WHATSAPP_MESSAGES } from "@/config/contact";
import { ACCOUNT_SECTION_IDS } from "@/config/navigation";
import type { AuthUser } from "@/features/auth";
import { AccountDetailList } from "./account-detail-list";
import { AdminHelp } from "./admin-help";
import { ProfileForm } from "./profile-form";

/** Kartu Data Pribadi: form ubah data, atau data hanya-baca + bantuan admin. */
export function PersonalDataCard({
  user,
  canEdit,
}: {
  user: AuthUser;
  canEdit: boolean;
}) {
  return (
    <BentoCard
      id={ACCOUNT_SECTION_IDS.personal}
      title="Data Pribadi"
      description={
        canEdit
          ? "Pastikan nomor WhatsApp aktif agar info setoran sampai ke Anda."
          : "Data yang terdaftar di akun Anda."
      }
      className="scroll-mt-6"
    >
      {canEdit ? (
        <ProfileForm
          defaultValues={{
            name: user.name,
            email: user.email,
            phone: user.phone,
          }}
        />
      ) : (
        <>
          <AccountDetailList
            items={[
              { label: "Nama Lengkap", value: user.name },
              { label: "Alamat Email", value: user.email },
              { label: "Nomor WhatsApp", value: user.phone },
            ]}
          />
          <AdminHelp
            text="Perubahan data pribadi saat ini dibantu admin."
            label="Ajukan perubahan"
            message={WHATSAPP_MESSAGES.profileChange({
              name: user.name,
              email: user.email,
            })}
          />
        </>
      )}
    </BentoCard>
  );
}
