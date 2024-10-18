import { Plus } from "@tamagui/lucide-icons";
import { Dialog, ListItem, YGroup } from "tamagui";
import { VocabularyExercise } from "../models/VocabularyExercise";
import { WordTranslation } from "../models/WordTranslation";
import { GrammarExercise, isGrammarExercise } from "../models/GrammarExercise";

export const WordTranslationSearchResult = ({
  title,
  index,
  wordPair,
  exercise,
  setExercise,
  role,
}: {
  title: string;
  index: number;
  wordPair: WordTranslation;
  exercise: VocabularyExercise | GrammarExercise;
  setExercise: React.Dispatch<
    React.SetStateAction<VocabularyExercise | GrammarExercise>
  >;
  role?: string;
}) => {
  return (
    <YGroup.Item key={index}>
      <Dialog.Close displayWhenAdapted asChild>
        <ListItem
          key={index}
          hoverTheme
          pressTheme
          title={title}
          iconAfter={Plus}
          disabled={isGrammarExercise(exercise) && role == ""}
          onPress={() => {
            if (isGrammarExercise(exercise)) {
              let updated_exercise: GrammarExercise = { ...exercise };
              updated_exercise.exercise_words?.push({
                id: wordPair.id,
                role: role ?? "",
                ceb_word: wordPair.words?.normal_form ?? "",
                suffix_form: "",
                eng_word: wordPair.translations?.word ?? "",
                part_of_speech: "",
              });
              setExercise(...[updated_exercise]);
              console.log("Added: ");
              console.log(exercise);
            } else {
              let updated_exercise: VocabularyExercise = { ...exercise };
              updated_exercise.item_sets?.push({
                id: wordPair.id,
                ceb_word: wordPair.words?.normal_form ?? "",
                phonetic_form: "",
                representation: "",
                eng_word: wordPair.translations?.word ?? "",
                part_of_speech: "",
              });
              setExercise(...[updated_exercise]);
              console.log("Added: ");
              console.log(exercise);
            }
          }}
        />
      </Dialog.Close>
    </YGroup.Item>
  );
};
