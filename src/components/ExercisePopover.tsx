import { ChevronRight, Hash } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Input,
  Label,
  ListItem,
  Popover,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import type { PopoverProps } from "tamagui";

export const ExercisePopover = ({
  title,
  subTitle,
  index,
  ...props
}: PopoverProps & {
  title: string;
  subTitle: string;
  index: number;
}) => {
  return (
    <Popover size="$5" allowFlip {...props}>
      <YGroup.Item key={index}>
        <Popover.Trigger asChild>
          <ListItem
            key={index}
            hoverTheme
            pressTheme
            title={title}
            subTitle={subTitle}
            icon={Hash}
            iconAfter={ChevronRight}
            onPress={() => {
              console.log("You just touched me! How dare you?");
            }}
          />
        </Popover.Trigger>
      </YGroup.Item>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack space="$3">
          <XStack space="$3">
            <Label size="$3" htmlFor={title}>
              Name
            </Label>
            <Input size="$3" id={title} />
          </XStack>

          <Popover.Close asChild>
            <Button
              size="$3"
              onPress={() => {
                console.log("Exercises started.");
                /* Custom code goes here, does not interfere with popover closure */
              }}
            >
              Start Exercise
            </Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};
