import { expect, test } from "@playwright/test";
import { fillLogin, gotoLogin, login, openMenu } from "./helpers";

test.describe("Area penabung", () => {
  test("login → Ringkasan → Jadwal → Paket → Keluar", async ({
    page,
    isMobile,
  }) => {
    await login(page);
    await expect(
      page.getByRole("heading", { name: "Assalamualaikum, Budi!" }),
    ).toBeVisible();
    await expect(page.getByText("2 dari 6 tahap selesai")).toBeVisible();

    // Jadwal setoran
    let menu = await openMenu(page, isMobile);
    await menu.getByRole("link", { name: /Jadwal setoran/ }).click();
    await expect(page).toHaveURL("/tabungan/jadwal");
    await expect(
      page.getByRole("heading", { name: "Jadwal Setoran", level: 1 }),
    ).toBeVisible();
    // Tabel (desktop) dan daftar kartu (ponsel) sama-sama ada di DOM
    await expect(
      page.getByText("Bulan ke-7").filter({ visible: true }),
    ).toBeVisible();
    await expect(
      page.getByText("5 November 2026").filter({ visible: true }),
    ).toBeVisible();

    // Paket qurban
    menu = await openMenu(page, isMobile);
    await expect(
      menu.getByRole("link", { name: /Jadwal setoran/ }),
    ).toHaveAttribute("aria-current", "page");
    await menu.getByRole("link", { name: "Paket qurban" }).click();
    await expect(page).toHaveURL("/tabungan/paket");
    await expect(
      page.getByRole("heading", { name: "Paket Qurban", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("Naik ke Domba Medium?")).toBeVisible();

    // Keluar (dengan konfirmasi)
    menu = await openMenu(page, isMobile);
    if (isMobile) {
      await menu.getByRole("button", { name: "Keluar" }).click();
    } else {
      await menu.getByRole("button", { name: /Menu akun/ }).click();
      await menu.getByRole("button", { name: "Keluar" }).click();
    }
    const confirm = page.getByRole("dialog", { name: "Keluar dari akun?" });
    await expect(confirm).toBeVisible();
    await confirm.getByRole("button", { name: "Ya, Keluar" }).click();
    await expect(page).toHaveURL(/\/login/);

    // Sesi benar-benar berakhir
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
  });

  test("halaman member tanpa sesi diarahkan ke login lalu kembali", async ({
    page,
  }) => {
    await page.goto("/tabungan/jadwal");
    await expect(page).toHaveURL(/\/login\?next=%2Ftabungan%2Fjadwal/);
    await login(page, "/tabungan/jadwal");
  });

  test("login gagal menampilkan pesan dari backend", async ({ page }) => {
    await gotoLogin(page);
    await fillLogin(page, "salah-sandi");
    await page.getByRole("button", { name: "Masuk", exact: true }).click();
    await expect(page.getByText("Email atau kata sandi salah.")).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Banner upgrade", () => {
  test.skip(({ isMobile }) => isMobile, "Banner sidebar diuji di desktop");

  test("ditutup bertahan saat reload, muncul lagi setelah login ulang", async ({
    page,
  }) => {
    await login(page);
    const sidebar = page.getByRole("complementary", { name: "Sidebar" });
    const banner = sidebar.getByRole("region", {
      name: "Penawaran naik paket",
    });

    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Naik ke Domba Medium");
    // Tunggu server action selesai menyimpan cookie sebelum reload
    await Promise.all([
      page.waitForResponse(
        (response) => response.request().method() === "POST",
      ),
      sidebar.getByRole("button", { name: "Tutup penawaran" }).click(),
    ]);
    await expect(banner).toBeHidden();

    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Assalamualaikum, Budi!" }),
    ).toBeVisible();
    await expect(banner).toBeHidden();

    // Login ulang → token baru → banner tampil lagi
    await sidebar.getByRole("button", { name: /Menu akun/ }).click();
    await sidebar.getByRole("button", { name: "Keluar" }).click();
    await page
      .getByRole("dialog", { name: "Keluar dari akun?" })
      .getByRole("button", { name: "Ya, Keluar" })
      .click();
    await expect(page).toHaveURL(/\/login/);

    await login(page);
    await expect(banner).toBeVisible();
  });

  test("sidebar diciutkan tetap diingat setelah reload", async ({ page }) => {
    await login(page);
    await page.getByRole("button", { name: "Ciutkan sidebar" }).click();
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Buka sidebar", exact: true }),
    ).toBeVisible();
  });
});
