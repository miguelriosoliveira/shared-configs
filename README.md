# shared-configs

Shared project configs.

**Two different ways to consume files. Do not mix them.**

| How | What | How you use it |
| --- | --- | --- |
| **Extend** | Renovate, Biome, TypeScript | Reference the preset / package export. Do not copy. |
| **Copy only** | [copy-only/](./copy-only/) | Copy the file into your repo root. Do not `extends` or import it. |

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

## Copy only

Templates live in [`copy-only/`](./copy-only/). Copy them into the **consuming repo root**. They have no `package.json` export and must not be extended.

| Copy from this repo | To this name in the consuming repo |
| --- | --- |
| [`copy-only/.editorconfig`](./copy-only/.editorconfig) | `.editorconfig` |
| [`copy-only/.nvmrc`](./copy-only/.nvmrc) | `.nvmrc` |
| [`copy-only/.npmrc`](./copy-only/.npmrc) | `.npmrc` |
| [`copy-only/.lintstagedrc.json`](./copy-only/.lintstagedrc.json) | `.lintstagedrc.json` |

See [`copy-only/README.md`](./copy-only/README.md) for the `cp` command. Renovate keeps `copy-only/.nvmrc` on the current Node LTS in this repo only; that does not update copies in other repos.
