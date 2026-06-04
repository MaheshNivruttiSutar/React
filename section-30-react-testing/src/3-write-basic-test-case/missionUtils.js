export function formatSol(day) {
  return `Sol ${day}`;
}

export function oxygenLevel(percent) {
  if (percent >= 90) return 'Nominal';
  if (percent >= 70) return 'Caution';
  return 'Critical';
}
