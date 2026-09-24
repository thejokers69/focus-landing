import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: true,
  functions: {
    api: {
      name: "Focus landing API",
      source: "./functions/api.ts",
      env: {
        ALLOWED_ORIGINS:
          process.env.ALLOWED_ORIGINS ??
          "http://localhost:5174,http://127.0.0.1:5174",
      },
    },
  },
  branch: (branch) => {
    if (branch.isDefault) {
      return {};
    }
    if (!branch.exists) {
      return { ttl: "7d" };
    }
    return {};
  },
});
