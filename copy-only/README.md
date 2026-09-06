# Copy-only files

**These files are templates. Copy them into a project root. Do not `extends`, import, or resolve them from `node_modules`.**

They are not in `package.json` `exports` on purpose. There is no package specifier for them.

```bash
cp copy-only/.editorconfig copy-only/.nvmrc copy-only/.npmrc copy-only/.lintstagedrc.json /path/to/your-repo/
```

| Copy this file | To this name at the repo root |
| --- | --- |
| `copy-only/.editorconfig` | `.editorconfig` |
| `copy-only/.nvmrc` | `.nvmrc` |
| `copy-only/.npmrc` | `.npmrc` |
| `copy-only/.lintstagedrc.json` | `.lintstagedrc.json` |

After copying, the file belongs to that repo. Change it there if you need an exception. Do not point tools at this folder.

Renovate’s `nvm` manager updates `copy-only/.nvmrc` in this repo (LTS majors only). That does not update copies you already made in other repos.
