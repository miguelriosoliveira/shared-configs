# shared-configs

Shared project configs. Each tool lives in its own folder so this repo can hold Renovate, Biome, TypeScript, and anything else later.

## Renovate

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["github>miguelriosoliveira/shared-configs//renovate/default"]
}
```

## Biome

Install this repo as a GitHub dependency, then extend the package export:

```json
{
	"devDependencies": {
		"@miguelriosoliveira/shared-configs": "github:miguelriosoliveira/shared-configs"
	}
}
```

```json
{
	"$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
	"extends": ["@miguelriosoliveira/shared-configs/biome"]
}
```

## TypeScript

Same GitHub dependency. Extend a flavor and keep `include`, `paths`, and plugins in the app:

| Flavor | For |
| --- | --- |
| `@miguelriosoliveira/shared-configs/tsconfig/base` | Shared compiler policy |
| `@miguelriosoliveira/shared-configs/tsconfig/react` | Vite / SPA React |
| `@miguelriosoliveira/shared-configs/tsconfig/next` | Next.js |
| `@miguelriosoliveira/shared-configs/tsconfig/node` | Node (tsx / tsup) |
| `@miguelriosoliveira/shared-configs/tsconfig/vite` | `vite.config.ts` project references |

```json
{
	"extends": "@miguelriosoliveira/shared-configs/tsconfig/react",
	"include": ["src"]
}
```
