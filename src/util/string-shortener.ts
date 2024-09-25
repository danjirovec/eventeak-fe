export const shortenString = (length: number, input: string) => {
  if (input.length > length) {
    const lastSpaceIndex = input.lastIndexOf(' ', length);
    const cutoffIndex = lastSpaceIndex !== -1 ? lastSpaceIndex : length;
    return input.slice(0, cutoffIndex) + '...';
  }
  return input
};
