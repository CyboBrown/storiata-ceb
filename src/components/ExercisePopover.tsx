import { ChevronRight, Hash } from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

export const ExercisePopover = ({
  title,
  subTitle,
  index,
}: {
  title: string;
  subTitle: string;
  index: number;
}) => {
  return (
    <YGroup.Item key={index}>
      <YGroup.Item key={index}>
        <ListItem
          key={index}
          hoverTheme
          pressTheme
          title={title}
          subTitle={subTitle}
          icon={Hash}
          iconAfter={ChevronRight}
          // onPress={() => {
          //   setSelected(index);
          //   setOpen(true);
          // }}
        />
      </YGroup.Item>
    </YGroup.Item>
  );
};
