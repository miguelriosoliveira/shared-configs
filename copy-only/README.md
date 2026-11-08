# Copy-only files

**These files are templates. Copy each one to the path in the table. Do not `extends`, import, or resolve them from `node_modules`.**

They are not in `package.json` `exports` on purpose. There is no package specifier for them.

```bash
cp copy-only/.editorconfig copy-only/.nvmrc copy-only/.npmrc copy-only/.lintstagedrc.json /path/to/your-repo/
cp copy-only/pre-commit /path/to/your-repo/.husky/pre-commit
cp copy-only/sonar-project.properties /path/to/your-repo/sonar-project.properties
```

| Copy this file | To this path |
| --- | --- |
| `copy-only/.editorconfig` | `.editorconfig` |
| `copy-only/.nvmrc` | `.nvmrc` |
| `copy-only/.npmrc` | `.npmrc` |
| `copy-only/.lintstagedrc.json` | `.lintstagedrc.json` |
| `copy-only/pre-commit` | `.husky/pre-commit` |
| `copy-only/sonar-project.properties` | `sonar-project.properties` |

After copying, the file belongs to that repo. Change it there if you need an exception. Do not point tools at this folder.

Renovate’s `nvm` manager updates `copy-only/.nvmrc` in this repo (LTS majors only). That does not update copies you already made in other repos.
