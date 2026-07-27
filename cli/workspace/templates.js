import fs from 'fs';
import path from 'path';
import { ensureUserConfigDir } from '../lib/user-config-dir.js';

/**
 * Copy OpenMole template files from the package root to the user-level
 * config directory: ~/.config/openmole/templates/
 *
 * Templates are shared across all projects — after `openmole init`,
 * skills resolve templates from this user-level directory.
 *
 * Resolution order (defined in skills):
 *   1. {config_dir}/templates/      — user-level (~/.config/openmole/templates/)
 *   2. <packageRoot>/templates/     — npm package install (fallback)
 */
export function copyUserTemplates({ packageRoot, dryRun }) {
  const src = path.join(packageRoot, 'templates');
  const configDir = ensureUserConfigDir();
  const dest = path.join(configDir, 'templates');

  if (!fs.existsSync(src)) {
    throw new Error(`OpenMole package templates not found: ${src}`);
  }

  if (fs.existsSync(dest)) {
    return { action: 'exists (already copied)', dest };
  }

  const files = fs.readdirSync(src).filter((f) => {
    const stat = fs.statSync(path.join(src, f));
    return stat.isFile();
  });

  if (dryRun) {
    return { action: 'copy (dry-run)', src, dest, files };
  }

  fs.mkdirSync(dest, { recursive: true });
  for (const file of files) {
    fs.copyFileSync(path.join(src, file), path.join(dest, file));
  }

  return { action: 'copied', src, dest, files };
}

/**
 * Resolve a template file path.
 * Checks user-level first ({config_dir}/templates/), then falls back to
 * package-level (<packageRoot>/templates/).
 */
export function resolveTemplate(templateFile, { packageRoot }) {
  const configDir = ensureUserConfigDir();
  const userPath = path.join(configDir, 'templates', templateFile);
  if (fs.existsSync(userPath)) {
    return userPath;
  }

  const packagePath = path.join(packageRoot, 'templates', templateFile);
  if (fs.existsSync(packagePath)) {
    return packagePath;
  }

  return null;
}
