import verbConjugation from "./verbs-conjugations.json";
import verbs from "./infinitiv-verbs-list.json";

export enum EnglishConjugations {
  Infinitive,
  Past,
  Present,
  PastParticiple,
  PresentParticiple,
}

export enum Persons {
  Singular1,
  Singular2,
  Singular3,
  Plural1,
  Plural2,
  Plural3,
}

export const conjugateEnglish = (
  word: string,
  conjugation: EnglishConjugations,
  person?: Persons
): string | null => {
  let index = verbs.indexOf(word);
  if (index === -1) {
    return null;
  }
  switch (conjugation) {
    case EnglishConjugations.Infinitive:
      return verbConjugation[index].verb;
    case EnglishConjugations.Past:
      if (person !== undefined) {
        return verbConjugation[index].indicative.imperfect![person];
      } else {
        return verbConjugation[index].indicative.imperfect![0];
      }
    case EnglishConjugations.Present:
      if (person) {
        return verbConjugation[index].indicative.present[person];
      } else {
        return verbConjugation[index].indicative.present[2];
      }
    case EnglishConjugations.PastParticiple:
      return verbConjugation[index].participle![0];
    case EnglishConjugations.PresentParticiple:
      return verbConjugation[index].gerund[0];
    default:
      return null;
  }
};

export const nasalize = (word: string) => {
  if (["p", "b"].includes(word.charAt(0))) {
    return "m" + word.substring(1);
  } else if (["t", "d", "s"].includes(word.charAt(0))) {
    return "n" + word.substring(1);
  } else if (["k"].includes(word.charAt(0))) {
    return "ng" + word.substring(1);
  } else if (["a", "e", "i", "o", "u"].includes(word.charAt(0))) {
    return "ng-" + word;
  } else {
    return "ng" + word;
  }
};

export const startsWithVowel = (word: string) => {
  return ["a", "e", "i", "o", "u"].includes(word.charAt(0));
};
