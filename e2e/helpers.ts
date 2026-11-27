import { expect, type Page } from "@playwright/test";

const MEMBER = {
  name: "Budi Santoso",
  email: "budi@mail.com",
  password: "rahasia123",
} as const;

export async function gotoLogin(page: Page, next?: string) {
  await page.goto(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
}

export async function fillLogin(
  page: Page,
  password: string = MEMBER.password,
) {
  const email = page.getByLabel("Email", { exact: true });
  const sandi = page.getByLabel("Kata Sandi", { exact: true });
  await expect(async () => {
    await email.fill(MEMBER.email);
    await sandi.fill(password);
    await expect(email).toHaveValue(MEMBER.email, { timeout: 500 });
    await expect(sandi).toHaveValue(password, { timeout: 500 });
  }).toPass({ timeout: 15_000 });
}

export async function login(page: Page, next?: string) {
  await gotoLogin(page, next);
  await fillLogin(page);
  await page.getByRole("button", { name: "Masuk", exact: true }).click();
  await expect(page).toHaveURL(next ?? "/dashboard");
}

export async function openMenu(page: Page, isMobile: boolean) {
  if (!isMobile) return page.getByRole("complementary", { name: "Sidebar" });
  await page.getByRole("button", { name: "Buka menu" }).click();
  return page.getByRole("dialog", { name: "Menu penabung" });
}
