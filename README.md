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
