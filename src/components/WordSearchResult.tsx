import { ChevronRight, Star } from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

export const WordSearchResult = ({
  title,
  subTitle,
  index,
  setSelected,
  setOpen,
}: {
  title: string;
  subTitle: string;
  index: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <YGroup.Item key={index}>
      <ListItem
        key={index}
        hoverTheme
        pressTheme
        title={title}
        subTitle={subTitle}
        icon={Star}
        iconAfter={ChevronRight}
        onPress={() => {
          setSelected(index);
          setOpen(true);
        }}
      />
    </YGroup.Item>
  );
};
