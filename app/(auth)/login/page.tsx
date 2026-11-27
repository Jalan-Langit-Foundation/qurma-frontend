import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun mudhohi untuk memantau tabungan qurban Anda.",
};

export default function LoginPage() {
  return <LoginForm />;
}
