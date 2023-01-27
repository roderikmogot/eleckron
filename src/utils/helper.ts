export const countBytesHelper = (size: object) => {
  const bytes = new TextEncoder().encode(JSON.stringify(size)).length;
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(3)} KB`;
  } else {
    return `${(bytes / 1048576).toFixed(3)} MB`;
  }
};
