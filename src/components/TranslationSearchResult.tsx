import { ChevronRight, Minus, Plus, Star } from "@tamagui/lucide-icons";
import { Dialog, ListItem, YGroup } from "tamagui";
import { DictionaryService } from "../services/DictionaryService";

export const TranslationSearchResult = ({
  title,
  subTitle,
  index,
  word_id,
  translation_id,
  is_delete,
}: {
  title: string;
  subTitle: string;
  index: number;
  word_id: number;
  translation_id: number;
  is_delete: boolean;
}) => {
  console.log(is_delete);

  return (
    <YGroup.Item key={index}>
      <Dialog.Close displayWhenAdapted asChild>
        <ListItem
          key={index}
          hoverTheme
          pressTheme
          title={title}
          subTitle={subTitle}
          iconAfter={is_delete ? Minus : Plus}
          onPress={async () => {
            if (is_delete) {
              await DictionaryService.removeWordTranslation(
                word_id,
                translation_id
              );
            } else {
              let data = await DictionaryService.addWordTranslation(
                word_id,
                translation_id
              );
              if (data) {
                console.log(data);
              }
            }
          }}
        />
      </Dialog.Close>
    </YGroup.Item>
  );
};
