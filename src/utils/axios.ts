export const timeDiffHelper = (startTime: number) => {
  let now = Date.now();
  let seconds = Math.floor((now - startTime) / 1000);
  let milliseconds = Math.floor((now - startTime) % 1000);
  return `${seconds}.${milliseconds}s`;
};
