import React from 'react';
import { Task } from '../../types/todo';
import { UI_TEXT } from '../../constants/uiText';

interface StatsProps {
  tasks: Task[];
}

export const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statsData = [
    { 
      id: 'total', 
      value: total, 
      label: UI_TEXT.STATS.LABELS.TOTAL, 
      description: UI_TEXT.STATS.DESCRIPTIONS.TOTAL 
    },
    { 
      id: 'completed', 
      value: completed, 
      label: UI_TEXT.STATS.LABELS.COMPLETED, 
      description: UI_TEXT.STATS.DESCRIPTIONS.COMPLETED 
    },
    { 
      id: 'pending', 
      value: pending, 
      label: UI_TEXT.STATS.LABELS.PENDING, 
      description: UI_TEXT.STATS.DESCRIPTIONS.PENDING 
    },
    { 
      id: 'progress', 
      value: `${percentage}%`, 
      label: UI_TEXT.STATS.LABELS.PROGRESS, 
      description: UI_TEXT.STATS.DESCRIPTIONS.PROGRESS 
    }
  ];

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
      <div className="stats-grid" role="group" aria-label="Métricas de progreso">
        {statsData.map((stat) => (
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
            <span 
              id={`stat-${stat.id}-label`}
              className="stat-label"
            >
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