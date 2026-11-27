import http from "node:http";

const PORT = Number(process.env.MOCK_BACKEND_PORT ?? 8099);

const USER = {
  id: 1,
  name: "Budi Santoso",
  email: "budi@mail.com",
  phone: "081234567890",
  role: "user",
};
const PASSWORD = "rahasia123";

const months = [
  "2026-11",
  "2026-12",
  "2027-01",
  "2027-02",
  "2027-03",
  "2027-04",
  "2027-05",
];
const schedule = months.map((month, i) => ({
  installment_no: i + 1,
  month,
  amount: i === 6 ? 220000 : 230000,
  paid_amount: i < 4 ? 230000 : 0,
  remaining_amount: i < 4 ? 0 : i === 6 ? 220000 : 230000,
  status: i < 4 ? "paid" : i === 4 ? "next" : "scheduled",
  is_final: i === 6,
}));

const saving = {
  id: 1,
  package: { code: "standar", name: "Domba Standar" },
  program_year: 2027,
  status: "active",
  target_amount: 1600000,
  total_paid: 920000,
  paid_this_month: 230000,
  remaining_amount: 680000,
  progress_percent: 57,
  tenor_months: 7,
  start_month: "2026-11",
  end_month: "2027-05",
  monthly_amount: 230000,
  last_installment_amount: 220000,
  next_installment: { month: "2027-03", amount: 230000 },
  journey: {
    target_selected: true,
    saving_started: true,
    half_reached: true,
    target_reached: false,
    animal_prepared: false,
    qurban_done: false,
    report_received: false,
  },
};

const packages = [
  {
    code: "standar",
    name: "Domba Standar",
    price: 1600000,
    weight_min: 20,
    weight_max: 25,
  },
  {
    code: "medium",
    name: "Domba Medium",
    price: 2200000,
    weight_min: 26,
    weight_max: 29,
  },
  {
    code: "premium",
    name: "Domba Premium",
    price: 2990000,
    weight_min: 30,
    weight_max: 35,
  },
];

const ok = (data, message = "OK") => ({ success: true, message, data });
const fail = (message) => ({ success: false, message, errors: null });

/** Token aktif. Setiap login memberi token baru (dipakai banner "muncul lagi tiap login"). */
const tokens = new Set();
let loginCount = 0;

function authed(req) {
  const token = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
  return tokens.has(token) ? token : null;
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  try {
    return JSON.parse(body || "{}");
  } catch {
    return {};
  }
}

const routes = {
  "GET /api/program": () => [
    200,
    ok({
      program: {
        year: 2027,
        default_tenor: 7,
        max_tenor: 12,
        rounding: 5000,
        registration_open: true,
        registration_deadline: "2027-04-30",
        idul_adha_date: "2027-05-17",
        idul_adha_is_estimate: true,
        payoff_deadline: "2027-05-07",
        last_installment_month: "2027-05",
        packages,
      },
    }),
  ],
  "POST /api/auth/login": async (req) => {
    const { email, password } = await readJson(req);
    if (email !== USER.email || password !== PASSWORD) {
      return [401, fail("Email atau kata sandi salah.")];
    }
    const token = `${USER.id}|e2e-token-${++loginCount}`;
    tokens.add(token);
    return [200, ok({ token, user: USER }, "Login berhasil")];
  },
  "POST /api/auth/logout": (req, token) => {
    tokens.delete(token);
    return [200, ok(null, "Logout berhasil")];
  },
  "GET /api/auth/me": () => [200, ok({ user: USER })],
  "GET /api/user/dashboard": () => [
    200,
    ok({
      user: { name: USER.name, email: USER.email },
      savings_count: 1,
      has_saving: true,
      saving,
      insights: {
        month_summary: {
          month: "2027-02",
          installment: {
            amount: 230000,
            paid_amount: 230000,
            remaining_amount: 0,
            status: "paid",
          },
          deposited: 230000,
        },
        daily_estimate: 7667,
        schedule_position: {
          status: "on_track",
          amount_behind: 0,
          months_ahead: 0,
        },
        // null: frontend tetap menawarkan paket berikutnya dari katalog
        upgrade_suggestion: null,
      },
    }),
  ],
  "GET /api/savings/current": () => [200, ok({ saving })],
  "GET /api/savings/1/deposits": () => [
    200,
    ok({
      saving_id: 1,
      target_amount: 1600000,
      total_paid: 920000,
      schedule,
      deposits: [
        { id: 1, amount: 230000, paid_at: "2026-11-05", note: null },
        { id: 2, amount: 230000, paid_at: "2026-12-08", note: null },
        { id: 3, amount: 230000, paid_at: "2027-01-10", note: null },
        { id: 4, amount: 230000, paid_at: "2027-02-03", note: null },
      ],
    }),
  ],
  "GET /api/savings/1/fulfillment": () => [
    200,
    ok({
      tracking: {
        saving_id: 1,
        available: false,
        status: null,
        steps: ["funds", "animal", "verification", "execution", "report"].map(
          (key) => ({ key, state: "pending" }),
        ),
        details: { animal_weight: null, slaughter_date: null, location: null },
      },
    }),
  ],
};

const PUBLIC = new Set(["GET /api/program", "POST /api/auth/login"]);

http
  .createServer(async (req, res) => {
    const key = `${req.method} ${(req.url ?? "").split("?")[0]}`;
    const handler = routes[key];
    const send = (status, body) => {
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(body));
    };

    if (!handler) return send(404, fail("Tidak ditemukan."));
    const token = authed(req);
    if (!PUBLIC.has(key) && !token) return send(401, fail("Unauthenticated."));

    const [status, body] = await handler(req, token);
    send(status, body);
  })
  .listen(PORT, "127.0.0.1", () => {
    console.warn(`[mock-backend] http://127.0.0.1:${PORT}/api`);
  });
