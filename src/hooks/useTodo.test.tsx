import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useTodo } from './useTodo';
import { beforeEach, describe } from 'vitest';
import { clearTodoStorage } from '../utils/localStorage';

describe('useTodo', () => {
  // Clean localStorage before each test to ensure test isolation
  beforeEach(() => {
    clearTodoStorage();
  });

  it('adds a task', async () => {
    const { result } = renderHook(() => useTodo());

    await act(async () => {
      result.current.addTask('Nueva tarea');
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].text).toBe('Nueva tarea');
    expect(result.current.tasks[0].completed).toBe(false);
    expect(typeof result.current.tasks[0].id).toBe('number');
  });

  it('does not add empty task', async () => {
    const { result } = renderHook(() => useTodo());
    await act(async () => {
      result.current.addTask('   ');
    });
    expect(result.current.tasks.length).toBe(0);
    expect(result.current.errorCodes).toContain('empty');
  });

  it('prevents duplicate tasks', async () => {
    const { result } = renderHook(() => useTodo());
    await act(async () => {
      result.current.addTask('Duplicada');
    });
    await act(async () => {
      result.current.addTask('duplicada');
    });
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.errorCodes).toContain('duplicate');
  });

  it('toggles and deletes task', async () => {
    const { result } = renderHook(() => useTodo());
    await act(async () => {
      result.current.addTask('Mover');
    });
    const id = result.current.tasks[0].id;
    await act(async () => result.current.toggleTask(id));
    expect(result.current.tasks[0].completed).toBe(true);
    await act(async () => result.current.deleteTask(id));
    expect(result.current.tasks.length).toBe(0);
  });

  it('adds task via CustomEvent', async () => {
    const { result } = renderHook(() => useTodo());

    await act(async () => {
      document.dispatchEvent(
        new CustomEvent('todo:add', { detail: { task: 'External Task' } })
      );
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].text).toBe('External Task');
  });

  it('emits count-changed event on task changes', async () => {
    const { result } = renderHook(() => useTodo());
    let eventDetail: { total: number; completed: number } | null = null;

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{
        total: number;
        completed: number;
      }>;
      eventDetail = customEvent.detail;
    };
    document.addEventListener('todo:count-changed', handler);

    await act(async () => {
      result.current.addTask('Event Test');
    });

    expect(eventDetail).toEqual({ total: 1, completed: 0 });

    document.removeEventListener('todo:count-changed', handler);
  });

  it('emits external-added event only when adding tasks externally', async () => {
    const { result } = renderHook(() => useTodo());
    let externalAddedFired = false;

    const handler = () => {
      externalAddedFired = true;
    };
    document.addEventListener('todo:external-added', handler);

    // Adding via normal method should NOT fire external-added event
    await act(async () => {
      result.current.addTask('Internal Task');
    });
    expect(externalAddedFired).toBe(false);

    // Adding via CustomEvent should fire external-added event
    await act(async () => {
      document.dispatchEvent(
        new CustomEvent('todo:add', { detail: { task: 'External Task' } })
      );
    });
    expect(externalAddedFired).toBe(true);

    document.removeEventListener('todo:external-added', handler);
  });
});
