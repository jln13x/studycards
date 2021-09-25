export const shuffleArray = (array: any[]) => {
  let lastIndex = array.length - 1;

  while (lastIndex !== 0) {
    const randomNumber = Math.floor(Math.random() * (lastIndex - 1));
    [array[randomNumber], array[lastIndex]] = [
      array[lastIndex],
      array[randomNumber],
    ];
    lastIndex--;
  }
  return array;
};
