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

export function extractPlaceholders(input: string): string[] {
  const regex = /<([^>]+)>/g; // Regular expression to match <...>
  const placeholders: string[] = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    placeholders.push(match[1]); // Push the captured group (inside the brackets)
  }

  return placeholders;
}

function getRandomPair(options: { en: string; ceb: string }[]): {
  en: string;
  ceb: string;
} {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export function replacePlaceholders(
  input: { en: string; ceb: string },
  values: { [key: string]: { en: string; ceb: string }[] }
): { en: string; ceb: string } {
  let placeholders = extractPlaceholders(input.en);
  if (placeholders.length == 0) placeholders = extractPlaceholders(input.ceb);
  console.log(placeholders);
  const replacements = placeholders.map((key) => {
    const options = values[key];
    return options
      ? getRandomPair(options)
      : { en: `<${key}>`, ceb: `<${key}>` }; // Maintain placeholder if not found
  });

  let sentence_en = input.en;
  let sentence_ceb = input.ceb;

  placeholders.forEach((key, index) => {
    sentence_en = sentence_en.replace(`<${key}>`, replacements[index].en);
    sentence_ceb = sentence_ceb.replace(`<${key}>`, replacements[index].ceb);
  });

  console.log("EN: " + sentence_en);
  console.log("CEB: " + sentence_ceb);

  return {
    en: sentence_en,
    ceb: sentence_ceb,
  };
}
