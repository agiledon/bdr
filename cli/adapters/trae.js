import path from 'path';
import { installProjectSkills } from '../lib/project-skills.js';

/** Trae: project .trae/skills/ (Trae auto-discovers SKILL.md via its `description`).
 *  Trae has no separate slash-command mechanism — skills are invoked through
 *  natural language, `#` quick match, or `@skills/.../SKILL.md` references. */
function installTraeProject({ packageRoot, targetDir, dryRun, force }) {
  const skillsDir = path.join(targetDir, '.trae', 'skills');
  const actions = installProjectSkills({ packageRoot, skillsDir, dryRun, force });
  return {
    scope: 'project',
    skillsDir,
    actions,
  };
}

export function installTrae({ packageRoot, targetDir, dryRun, force }) {
  const project = installTraeProject({ packageRoot, targetDir, dryRun, force });

  return {
    ide: 'trae',
    project,
    action: 'project .trae/skills/',
  };
}
