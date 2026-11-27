import "server-only";
import * as React from "react";
import { MessageCircle } from "lucide-react";
import { MemberContainer, PageHeader, WhatsappLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { toMemberMessageDetails, WHATSAPP_MESSAGES } from "@/config/contact";
import { PackageCompareList } from "@/features/packages";
import { getProgram } from "@/features/program/server";
import { buildPackageView } from "../lib/dashboard-view";
import { loadDashboard } from "../lib/load-dashboard";
import { resolveUpgradeSuggestion } from "../lib/upgrade-offer";
import { MyPackageCard } from "./my-package-card";
import { UpgradeSuggestionCard } from "./upgrade-suggestion-card";

export async function PackagesPage() {
  const [{ user, saving, insights }, { packages }] = await Promise.all([
    loadDashboard(),
    getProgram(),
  ]);

  const member = toMemberMessageDetails(user, saving);
  const suggestion = resolveUpgradeSuggestion(saving, insights, packages);
  const packageView = saving ? buildPackageView(saving, packages, null) : null;

  return (
    <MemberContainer>
      <div className="flex flex-col gap-6">
        <PageHeader
          eyebrow="Tabungan"
          title="Paket Qurban"
          description={
            saving
              ? "Ingin pindah paket? CS QURMA membantu menghitung ulang setoran Anda."
              : "Pilihan domba qurban beserta target bobot dan harganya."
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {packageView && (
            <MyPackageCard
              data={packageView}
              showPackagesLink={false}
              className="lg:col-span-1"
            />
          )}
          <div
            className={
              packageView
                ? "flex flex-col gap-4 lg:col-span-2"
                : "flex flex-col gap-4 lg:col-span-3"
            }
          >
            {suggestion && (
              <UpgradeSuggestionCard suggestion={suggestion} member={member} />
            )}
            <PackageCompareList
              packages={packages}
              currentPackageId={saving?.packageId ?? null}
            />
            <WhatsappLink
              message={WHATSAPP_MESSAGES.memberQuestion(member)}
              className={buttonClassName({
                variant: "soft",
                size: "pill",
                className: "self-start",
              })}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Tanya CS QURMA soal ganti paket
            </WhatsappLink>
          </div>
        </div>
      </div>
    </MemberContainer>
  );
}
