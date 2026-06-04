import { addTaskToList } from './taskUtils';

describe('addTaskToList — without event', () => {
  test('adds a task to an empty list', () => {
    const result = addTaskToList([], 'Buy groceries');

    expect(result.error).toBeNull();
    expect(result.tasks).toEqual(['Buy groceries']);
  });

  test('returns error when task name is empty', () => {
    const result = addTaskToList([], '   ');

    expect(result.error).toBe('Task name cannot be empty');
    expect(result.tasks).toEqual([]);
  });

  test('appends task to existing list', () => {
    const result = addTaskToList(['Walk dog'], 'Pay bills');

    expect(result.tasks).toEqual(['Walk dog', 'Pay bills']);
  });
});
