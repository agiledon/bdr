import fs from 'fs';
import path from 'path';

/**
 * Copy OpenMole templates from the package root to the project-level
 * `openmole/templates/` directory.
 *
 * Resolution order:
 * 1. Project-level: `<targetDir>/openmole/templates/` (after init)
 * 2. Package-level: `<packageRoot>/templates/` (from npm install)
 *
 * During `openmole init`, step 2 is copied to step 1 so that
 * skills can always resolve templates from the project root.
 */
export function copyProjectTemplates({ packageRoot, targetDir, dryRun }) {
  const src = path.join(packageRoot, 'templates');
  const dest = path.join(targetDir, 'openmole', 'templates');

  if (!fs.existsSync(src)) {
    throw new Error(`OpenMole templates not found: ${src}`);
  }

  if (fs.existsSync(dest)) {
    return { action: 'exists (already copied)', src, dest };
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
 * Checks project-level first, then falls back to package-level.
 */
export function resolveTemplate(templateFile, { targetDir, packageRoot }) {
  const projectPath = path.join(targetDir, 'openmole', 'templates', templateFile);
  if (fs.existsSync(projectPath)) {
    return projectPath;
  }

  const packagePath = path.join(packageRoot, 'templates', templateFile);
  if (fs.existsSync(packagePath)) {
    return packagePath;
  }

  return null;
}
