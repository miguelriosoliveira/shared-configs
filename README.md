# shared-configs

Shared project configs.

**Three different ways to consume files. Do not mix them.**

| How | What | How you use it |
| --- | --- | --- |
| **Call** | CI workflow | Call the reusable workflow from your repo. Pin the call to a tag. |
| **Extend** | Renovate, Biome, TypeScript, Vitest, Stryker | Reference the preset / package export. Do not copy. |
| **Copy only** | [copy-only/](./copy-only/) | Copy the file into your repo. Do not `extends` or import it. |

## Renovate

Source in this repo: [`renovate/default.json`](./renovate/default.json)

Put this in the **consuming repo's** `renovate.json`:

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["github>miguelriosoliveira/shared-configs//renovate/default"]
}
```

This repo's own `renovate.json` uses `local>…` instead of `github>…` so it extends that same file without a GitHub fetch.

## Biome

Source in this repo: [`biome/biome.json`](./biome/biome.json)

Install this repo as a GitHub dependency in the **consuming repo's** `package.json`:

```json
{
	"devDependencies": {
		"@miguelriosoliveira/shared-configs": "github:miguelriosoliveira/shared-configs"
	}
}
```

Then extend the export in the **consuming repo's** `biome.json`:

```json
{
	"$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
	"extends": ["@miguelriosoliveira/shared-configs/biome"]
}
```

`@miguelriosoliveira/shared-configs/biome` resolves to `biome/biome.json` via `package.json` `exports`.

## TypeScript

Sources in this repo:

| Export | File |
| --- | --- |
| `@miguelriosoliveira/shared-configs/tsconfig/react` | [`tsconfig/react.json`](./tsconfig/react.json) |
| `@miguelriosoliveira/shared-configs/tsconfig/node` | [`tsconfig/node.json`](./tsconfig/node.json) |

Both flavors extend [`tsconfig/base.json`](./tsconfig/base.json). That file is not exported; do not reference it from an app.

Same GitHub dependency as Biome (`package.json` `devDependencies` above). Keep `include`, `paths`, and extra flags in the app.

Browser app — consuming repo's `tsconfig.json` (or `web/tsconfig.json`):

```json
{
	"extends": "@miguelriosoliveira/shared-configs/tsconfig/react",
	"include": ["src"]
}
```

Node server — consuming repo's `tsconfig.json` (or `server/tsconfig.json`):

```json
{
	"extends": "@miguelriosoliveira/shared-configs/tsconfig/node"
}
```

Next.js and `vite.config.ts` add their extra flags in those same project files. Do not add more flavors here.

## CI

Source in this repo: [`.github/workflows/ci.yaml`](./.github/workflows/ci.yaml)

The workflow checks out the caller, reads `.nvmrc` and `packageManager`, installs with a frozen lockfile, then runs `pnpm lint:check`, `pnpm typecheck`, `pnpm test:cov`, `pnpm test:mutation`, and `pnpm build`. It uploads `coverage/lcov.info`, sends it to Coveralls, and waits for the Sonar quality gate.

Put this in the **consuming repo's** `.github/workflows/ci.yaml`. Replace `v1` with the tag you intend to run.

```yaml
name: CI

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

permissions:
  contents: read
  security-events: write

jobs:
  ci:
    uses: miguelriosoliveira/shared-configs/.github/workflows/ci.yaml@v1
    secrets: inherit
```

The caller must define those five scripts. `test:cov` writes `coverage/lcov.info`. `secrets: inherit` passes `SONAR_TOKEN`. The scan fails when that secret is missing, when `sonar-project.properties` has no real `sonar.projectKey`, or when the quality gate fails. Create the SonarCloud project before the first run.

A deploy job stays in the caller and uses `needs: ci`.

## Vitest

Sources in this repo:

| Export | File | Coverage include |
| --- | --- | --- |
| `@miguelriosoliveira/shared-configs/vitest/react` | [`vitest/react.mjs`](./vitest/react.mjs) | `src/**/*.{ts,tsx}` |
| `@miguelriosoliveira/shared-configs/vitest/node` | [`vitest/node.mjs`](./vitest/node.mjs) | `src/**/*.ts` |

Both set the v8 provider, the `text` and `lcov` reporters, and 100% thresholds. Keep the environment, plugins, aliases, and setup files in the app.

```ts
import { coverage } from '@miguelriosoliveira/shared-configs/vitest/react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		coverage,
	},
});
```

## Stryker

Source in this repo: [`stryker/base.mjs`](./stryker/base.mjs)

The preset uses the Vitest runner, ignores static mutants, writes an incremental report, and sets `thresholds.break` to 100. Spread it and add the app's Vitest config path.

```js
import { stryker } from '@miguelriosoliveira/shared-configs/stryker';

export default {
	...stryker,
	vitest: {
		configFile: 'vitest.config.mts',
	},
};
```

Save that file as `stryker.config.mjs`. Override `mutate` when a file must stay out of the run.

## Copy only

Templates live in [`copy-only/`](./copy-only/). Copy them into the **consuming repo root**. They have no `package.json` export and must not be extended.

| Copy from this repo | To this name in the consuming repo |
| --- | --- |
| [`copy-only/.editorconfig`](./copy-only/.editorconfig) | `.editorconfig` |
| [`copy-only/.nvmrc`](./copy-only/.nvmrc) | `.nvmrc` |
| [`copy-only/.npmrc`](./copy-only/.npmrc) | `.npmrc` |
| [`copy-only/.lintstagedrc.json`](./copy-only/.lintstagedrc.json) | `.lintstagedrc.json` |
| [`copy-only/pre-commit`](./copy-only/pre-commit) | `.husky/pre-commit` |
| [`copy-only/sonar-project.properties`](./copy-only/sonar-project.properties) | `sonar-project.properties` |

See [`copy-only/README.md`](./copy-only/README.md) for the `cp` command. Renovate keeps `copy-only/.nvmrc` on the current Node LTS in this repo only; that does not update copies in other repos.
