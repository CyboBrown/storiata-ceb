import { Plus } from "@tamagui/lucide-icons";
import { Dialog, ListItem, YGroup } from "tamagui";
import { VocabularyExercise } from "../models/VocabularyExercise";
import { WordTranslation } from "../models/WordTranslation";

export const WordTranslationSearchResult = ({
  title,
  index,
  wordPair,
  exercise,
  setExercise,
}: {
  title: string;
  index: number;
  wordPair: WordTranslation;
  exercise: VocabularyExercise;
  setExercise: React.Dispatch<React.SetStateAction<VocabularyExercise>>;
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
          onPress={() => {
            let updated_exercise = { ...exercise };
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
          }}
          // onPress={async () => {
          //   let data = await DictionaryService.addWordTranslation(
          //     word_id,
          //     translation_id
          //   );
          //   if (data) {
          //     console.log(data);
          //   }
          // }}
        />
      </Dialog.Close>
    </YGroup.Item>
  );
};
