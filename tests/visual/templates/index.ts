export type { VisualScenario } from './types';

export { boardingPassTemplate, boardingPassScenario } from './boardingPass';
export { checkoutCardTemplate, checkoutCardScenario } from './checkoutCard';
export { markdownSpecTemplate, markdownSpecScenario } from './markdownSpec';
export { mediaListTemplate, mediaListScenario } from './mediaList';
export { scheduleCardTemplate, scheduleCardScenario } from './scheduleCard';
export { settingsFormTemplate, settingsFormScenario } from './settingsForm';
export { summaryCardTemplate, summaryCardScenario } from './summaryCard';

import { boardingPassScenario } from './boardingPass';
import { checkoutCardScenario } from './checkoutCard';
import { markdownSpecScenario } from './markdownSpec';
import { mediaListScenario } from './mediaList';
import { scheduleCardScenario } from './scheduleCard';
import { settingsFormScenario } from './settingsForm';
import { summaryCardScenario } from './summaryCard';
import type { VisualScenario } from './types';

export const visualScenarios: VisualScenario[] = [
  checkoutCardScenario,
  boardingPassScenario,
  scheduleCardScenario,
  summaryCardScenario,
  settingsFormScenario,
  markdownSpecScenario,
  mediaListScenario,
];
