export type InstallmentStatus = "paid" | "overdue" | "next" | "scheduled";

export type InstallmentStatusLabel =
  "Lunas" | "Terlambat" | "Pelunasan" | "Berikutnya" | "Terjadwal";

export function getInstallmentStatusLabel(
  status: InstallmentStatus,
  isFinal: boolean,
): InstallmentStatusLabel {
  switch (status) {
    case "paid":
      return "Lunas";
    case "overdue":
      return "Terlambat";
    case "next":
      return isFinal ? "Pelunasan" : "Berikutnya";
    case "scheduled":
      return isFinal ? "Pelunasan" : "Terjadwal";
  }
}
