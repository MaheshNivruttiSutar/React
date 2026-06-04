export function addTaskToList(tasks, taskName) {
  const trimmed = taskName.trim();

  if (!trimmed) {
    return { tasks, error: 'Task name cannot be empty' };
  }

  return {
    tasks: [...tasks, trimmed],
    error: null,
  };
}
