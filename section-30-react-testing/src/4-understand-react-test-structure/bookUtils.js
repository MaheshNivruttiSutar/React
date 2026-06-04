export function readingProgress(pagesRead, totalPages) {
  const percent = Math.round((pagesRead / totalPages) * 100);
  return `${percent}%`;
}

export function isFinished(pagesRead, totalPages) {
  return pagesRead >= totalPages;
}
