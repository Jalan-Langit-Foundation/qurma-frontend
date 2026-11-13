import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description: "Daftar akun mudhohi untuk memulai tabungan qurban 2027.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
