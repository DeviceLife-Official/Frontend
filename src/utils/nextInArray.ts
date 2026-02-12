export const nextInArray = <T>(arr: readonly T[], current: T) => {
  const idx = arr.indexOf(current);
  const safeIdx = idx === -1 ? 0 : idx;
  return arr[(safeIdx + 1) % arr.length];
};
