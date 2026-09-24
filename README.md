# focus-landing

Vite + React landing page for Focus, with shadcn/ui components and a dark/light theme toggle.

## Local setup

```bash
pnpm install
pnpm run dev
```

Build for production: `pnpm run build` · Preview build: `pnpm run preview`

## Neon + GitHub

This repo is connected to the Neon project **focus-landing** (`thejokers69/focus-landing`). GitHub Actions uses the Neon integration secrets:

- `NEON_API_KEY` (secret)
- `NEON_PROJECT_ID` (variable)

On each pull request, [`.github/workflows/neon_workflow.yml`](.github/workflows/neon_workflow.yml) creates a preview branch named `preview/pr-<number>-<git-branch>` and deletes it when the PR closes. View branches in the [Neon Console](https://console.neon.tech).

When you add migrations or tests, run them in the `create_neon_branch` job and set `DATABASE_URL` from `steps.create_neon_branch.outputs.db_url_with_pooler` (do not log that value).
