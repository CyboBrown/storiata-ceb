export const shuffleArray = (array: Array<any>): Array<any> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const randomIndex = (max: number): number => {
  let min = 0;
  // return Math.floor(Math.random() * (max - min + 1) + min);
  return Math.floor(Math.random() * max);
};
