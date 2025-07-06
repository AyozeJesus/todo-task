import { UI_TEXT } from '../constants/uiText';

// Application constants
export const INITIAL_TASK_ID = 1;
export const MAX_TASK_LENGTH = 20;

export const statsData = (
  total: number,
  completed: number,
  pending: number,
  percentage: number
) => [
  {
    id: 'total',
    value: total,
    label: UI_TEXT.STATS.LABELS.TOTAL,
    description: UI_TEXT.STATS.DESCRIPTIONS.TOTAL,
  },
  {
    id: 'completed',
    value: completed,
    label: UI_TEXT.STATS.LABELS.COMPLETED,
    description: UI_TEXT.STATS.DESCRIPTIONS.COMPLETED,
  },
  {
    id: 'pending',
    value: pending,
    label: UI_TEXT.STATS.LABELS.PENDING,
    description: UI_TEXT.STATS.DESCRIPTIONS.PENDING,
  },
  {
    id: 'progress',
    value: `${percentage}%`,
    label: UI_TEXT.STATS.LABELS.PROGRESS,
    description: UI_TEXT.STATS.DESCRIPTIONS.PROGRESS,
  },
];
