export enum PartsOfSpeech {
  " " = " ",
  "adjective" = "adj",
  "noun" = "n",
  "number" = "num",
  "verb" = "v",
}

export enum RevPartsOfSpeech {
  " " = " ",
  "adj" = "adjective",
  "n" = "noun",
  "num" = "number",
  "v" = "verb",
}

export enum EngPartsOfSpeech {
  "Noun" = "N",
  "Plural" = "p",
  "Noun Phrase" = "h",
  "Verb (usu. participle)" = "V",
  "Verb (transitive)" = "t",
  "Verb (intransitive)" = "i",
  "Adjective" = "A",
  "Adverb" = "v",
  "Conjunction" = "C",
  "Preposition" = "P",
  "Interjection" = "!",
  "Pronoun" = "r",
  "Definite Article" = "D",
  "Indefinite Article" = "I",
  "Nominative" = "o",
}

export enum RevEngPartsOfSpeech {
  "N" = "Noun",
  "p" = "Plural",
  "h" = "Noun Phrase",
  "V" = "Verb (usu. participle)",
  "t" = "Verb (transitive)",
  "i" = "Verb (intransitive)",
  "A" = "Adjective",
  "v" = "Adverb",
  "C" = "Conjunction",
  "P" = "Preposition",
  "!" = "Interjection",
  "r" = "Pronoun",
  "D" = "Definite Article",
  "I" = "Indefinite Article",
  "o" = "Nominative",
}

export enum ExerciseTypes {
  Uncategorized,
  Vocabulary,
  Grammar,
  Listening,
  Speaking,
}

export enum VocabularyExerciseType {
  ChooseCebRepresentationForEngWord,
  ChooseCebWordForEngWord,
  ChooseEngWordForCebWord,
  ChooseRepresentationForCebWord,
  InputCebWordForEngWord,
  InputEngWordForCebWord,
}

export enum GrammarExerciseType {
  ChooseCebuanoForEnglishSentence,
  ChooseEnglishForCebuanoSentence,
  InputMissingCebuanoWord,
  InputMissingEnglishWord,
  InputCebuanoSentence,
  InputEnglishSentence,
}

export enum ListeningExerciseType {
  ChooseTranscription,
  ChooseTranslation,
  InputMissingCebuanoWord,
  InputMissingEnglishWord,
  InputTranscription,
  InputTranslation,
}
