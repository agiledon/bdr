import fs from 'fs';
import path from 'path';
import process from 'process';

/**
 * Resolve the user-level OpenMole config directory following XDG Base Directory
 * Specification (platform-aware).
 *
 * Priority:
 *   1. $OPENMOLE_CONFIG_DIR env var (explicit user override)
 *   2. $XDG_CONFIG_HOME/openmole/  (if XDG_CONFIG_HOME is set)
 *   3. ~/.config/openmole/         (macOS/Linux default)
 *   4. %APPDATA%\openmole\         (Windows)
 *
 * Returns the absolute path — does NOT create the directory.
 */
export function resolveUserConfigDir() {
  if (process.env.OPENMOLE_CONFIG_DIR) {
    return path.resolve(process.env.OPENMOLE_CONFIG_DIR);
  }

  if (process.env.XDG_CONFIG_HOME) {
    return path.join(path.resolve(process.env.XDG_CONFIG_HOME), 'openmole');
  }

  if (process.platform === 'win32' && process.env.APPDATA) {
    return path.join(path.resolve(process.env.APPDATA), 'openmole');
  }

  return path.join(process.env.HOME || '~', '.config', 'openmole');
}

/**
 * Ensure the user-level config directory exists (creates if missing).
 */
export function ensureUserConfigDir() {
  const dir = resolveUserConfigDir();
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
