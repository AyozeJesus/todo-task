import React from 'react';
import { UI_TEXT } from '../../constants/uiText';
import { StatsProps } from '../../types/components';
import { statsData } from '../../config/constants';
import { getStats } from '../../constants/task';

export const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const { totalTasks, completedTasks, pendingTasks, percentage } =
    getStats(tasks);
  const stats = statsData(totalTasks, completedTasks, pendingTasks, percentage);

  return (
    <section
      className="stats"
      role="region"
      aria-labelledby="stats-heading"
      aria-live="polite"
    >
      <h3 id="stats-heading" className="sr-only">
        {UI_TEXT.STATS.HEADING}
      </h3>
      <div
        className="stats-grid"
        role="group"
        aria-label="Métricas de progreso"
      >
        {stats.map(stat => (
          <div
            key={stat.id}
            className="stat-item"
            role="img"
            aria-labelledby={`stat-${stat.id}-label`}
            aria-describedby={`stat-${stat.id}-desc`}
          >
            <span
              className="stat-number"
              aria-label={`${stat.value} ${stat.label.toLowerCase()}`}
            >
              {stat.value}
            </span>
            <span id={`stat-${stat.id}-label`} className="stat-label">
              {stat.label}
            </span>
            <span id={`stat-${stat.id}-desc`} className="sr-only">
              {stat.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
