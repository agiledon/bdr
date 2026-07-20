import { createSkillCommandAdapter } from '../lib/project-skills.js';

export const installWorkBuddy = createSkillCommandAdapter({ ide: 'workbuddy', ideDir: '.workbuddy' });
