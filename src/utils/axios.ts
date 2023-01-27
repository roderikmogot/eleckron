export const timeDiffHelper = (startTime: number) => {
  const now = Date.now();
  const seconds = Math.floor((now - startTime) / 1000);
  const milliseconds = Math.floor((now - startTime) % 1000);
  return `${seconds}.${milliseconds}s`;
};
