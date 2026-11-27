import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const resolve = {
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
    "server-only": fileURLToPath(
      new URL("./test/stubs/server-only.ts", import.meta.url),
    ),
  },
};

export default defineConfig({
  resolve,
  test: {
    projects: [
      {
        resolve,
        test: {
          name: "unit",
          environment: "node",
          include: ["test/**/*.test.ts"],
        },
      },
      {
        resolve,
        test: {
          name: "dom",
          environment: "jsdom",
          include: ["test/**/*.test.tsx"],
          setupFiles: ["./test/setup/dom.ts"],
        },
      },
    ],
  },
});
