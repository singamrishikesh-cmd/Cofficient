export const formatCountPlus = (count: number, threshold: number): string => {
  if (count >= threshold) return `${threshold}+`;
  return String(count);
};

