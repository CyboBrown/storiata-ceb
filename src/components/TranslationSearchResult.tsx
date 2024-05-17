import { ChevronRight, Plus, Star } from "@tamagui/lucide-icons";
import { Dialog, ListItem, YGroup } from "tamagui";
import { DictionaryService } from "../services/DictionaryService";

export const TranslationSearchResult = ({
  title,
  subTitle,
  index,
  word_id,
}: {
  title: string;
  subTitle: string;
  index: number;
  word_id: number;
}) => {
  return (
    <YGroup.Item key={index}>
      <Dialog.Close displayWhenAdapted asChild>
        <ListItem
          key={index}
          hoverTheme
          pressTheme
          title={title}
          subTitle={subTitle}
          iconAfter={Plus}
          onPress={async () => {
            if (word_id && index) {
              let data = await DictionaryService.addWordTranslation(
                word_id,
                index
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
