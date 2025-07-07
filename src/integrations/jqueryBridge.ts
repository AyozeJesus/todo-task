import { TodoBridge } from '../types/bridge';
import { Task } from '../types/todo';

/**
 * jQuery Bridge for Todo App Integration
 *
 * ARCHITECTURAL DECISION: Hybrid React-jQuery Integration
 *
 * This module provides seamless integration between the React Todo component
 * and external jQuery-based pages. It enables bidirectional communication
 * through custom events.
 *
 * Why this approach?
 * - Maintains React's unidirectional data flow
 * - Allows legacy jQuery code to interact with modern React components
 * - Uses browser's native event system for loose coupling
 * - Provides clean API surface for external integrations
 *
 * Events:
 * - todo:add (jQuery → React): Add a task from external code
 * - todo:count-changed (React → jQuery): Notify when task counts change
 * - todo:external-added (React → jQuery): Notify when external task was added successfully
 */

declare global {
  interface Window {
    TodoBridge: TodoBridge;
    announceToScreenReader: (message: string) => void;
  }
}

/**
 * Screen reader announcement function for accessibility
 *
 * Creates temporary DOM elements with aria-live attributes to announce
 * dynamic content changes to assistive technologies
 */
function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove the announcement after a short delay to clean up DOM
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Initialize the bridge with public API
window.TodoBridge = {
  addTask: (text: string) => {
    document.dispatchEvent(
      new CustomEvent('todo:add', { detail: { task: text } })
    );
  },

  onCountChanged: (callback: (total: number, completed: number) => void) => {
    document.addEventListener('todo:count-changed', (e: Event) => {
      const custom = e as CustomEvent<{ total: number; completed: number }>;
      callback(custom.detail.total, custom.detail.completed);
    });
  },

  onExternalAdded: (callback: () => void) => {
    document.addEventListener('todo:external-added', callback);
  },
};

// Make screen reader function globally available
window.announceToScreenReader = announceToScreenReader;

/**
 * jQuery integration initialization
 *
 * Sets up DOM manipulation and event handling for the jQuery side
 * of the application. Runs when DOM is ready.
 */
$(function () {
  // Update the counter from localStorage on page load
  function updateCounterFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const total = tasks.length;
    const completed = tasks.filter((t: Task) => t.completed).length;
    $('#task-count').text(`${total}/${completed}`);
  }
  updateCounterFromStorage();

  // Listen to count changes from React
  document.addEventListener('todo:count-changed', e => {
    const { total, completed } = (
      e as CustomEvent<{ total: number; completed: number }>
    ).detail;
    $('#task-count').text(`${total}/${completed}`);
  });

  // Add task from jQuery panel
  $('#add-task-jq').on('click', () => {
    const taskText = $('#task-input-jq').val() as string;
    const trimmed = taskText.trim();
    if (trimmed) {
      document.dispatchEvent(
        new CustomEvent('todo:add', { detail: { task: trimmed } })
      );
      $('#task-input-jq').val('');
    }
  });
});
