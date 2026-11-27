import type { Metadata } from "next";
import { PROGRAM } from "@/config/program";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description: `Daftar akun mudhohi untuk memulai tabungan qurban ${PROGRAM.year}.`,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
