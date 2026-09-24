# focus-landing

Vite + React marketing site for Focus, with shadcn/ui, dark/light theme, and a Neon-backed waitlist API.

## Local setup (landing)

```bash
pnpm install
cp .env.example .env
pnpm run dev
```

Build: `pnpm run build` · Preview build: `pnpm run preview`

The app reads `VITE_NEON_API_URL` for waitlist POSTs. In dev it defaults to `http://localhost:8787` when that variable is unset.

## Neon project

This repo is the source of truth for the Neon project **focus-landing** (`broad-bar-46787727`, default branch `production`).

| Piece | Location |
| --- | --- |
| Branch policy + services | [`neon.ts`](neon.ts) (`auth: true`, function slug `api`) |
| HTTP API | [`functions/api.ts`](functions/api.ts) — `GET /`, `GET /health`, `POST /waitlist` |
| Drizzle schema | [`db/schema.ts`](db/schema.ts) |
| SQL migration | [`drizzle/0000_waitlist_entries.sql`](drizzle/0000_waitlist_entries.sql) |

### First-time backend setup

1. Install the [Neon CLI](https://neon.com/docs/reference/neon-cli) and sign in.
2. Link this directory to the project (production branch):

   ```bash
   neon link --project-id broad-bar-46787727
   neon env pull
   ```

3. Apply migrations to the linked branch (uses `DATABASE_URL_UNPOOLED` from `.env`):

   ```bash
   pnpm run db:migrate
   ```

4. Run the API locally with hot reload:

   ```bash
   pnpm run neon:dev
   ```

5. Deploy the function and branch policy to Neon:

   ```bash
   # Set browser origins for CORS before deploy (include Vercel + localhost)
   export ALLOWED_ORIGINS="http://localhost:5174,https://your-production.vercel.app"
   pnpm run neon:deploy
   ```

6. Copy the function URL into Vercel and local env:

   ```bash
   neon functions get api
   # Set VITE_NEON_API_URL to invocation_url (no trailing slash)
   ```

### Migrations on `production`

Use a direct connection string (not the pooler):

```bash
neon link --project-id broad-bar-46787727 --branch production
neon env pull
pnpm run db:migrate
```

For a quick schema sync in a dev branch only, you can use `pnpm run db:push` instead of checked-in migrations.

### Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Neon (injected into Functions) | Pooled Postgres at runtime |
| `DATABASE_URL_UNPOOLED` | Local / CI migrate | Direct URL for `drizzle-kit migrate` |
| `ALLOWED_ORIGINS` | `neon deploy` / function env | CORS allow-list for browser POSTs |
| `NEON_AUTH_*` | Neon (injected when `auth: true`) | Reserved for future authenticated APIs |
| `VITE_NEON_API_URL` | Vercel + local `.env` | Public HTTPS URL of the `api` function |

**Vercel (frontend):** set `VITE_NEON_API_URL` to the `api` function `invocation_url` for production (and preview if you use a shared API URL).

**Neon Function CORS:** redeploy with `ALLOWED_ORIGINS` including every Vercel hostname that should call the API (production, preview pattern, and `http://localhost:5174` for local Vite).

## GitHub + Neon preview branches

[`.github/workflows/neon_workflow.yml`](.github/workflows/neon_workflow.yml) creates an ephemeral branch per pull request and deletes it when the PR closes.

Configure in the GitHub repo (from the [Neon GitHub integration](https://neon.com/docs/guides/neon-github-integration)):

| GitHub | Name | Purpose |
| --- | --- | --- |
| Secret | `NEON_API_KEY` | Neon API key for create/delete branch actions |
| Variable | `NEON_PROJECT_ID` | Project id, e.g. `broad-bar-46787727` |

The workflow outputs `db_url` (direct) and `db_url_with_pooler` (pooled). To run migrations on preview branches, uncomment the migrate step and set:

```yaml
DATABASE_URL_UNPOOLED: ${{ steps.create_neon_branch.outputs.db_url }}
```

Do not log connection strings in CI logs.
