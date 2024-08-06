import { ChevronRight, Hash, Lock, Unlock } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import {
  Adapt,
  Button,
  Input,
  Label,
  ListItem,
  Popover,
  SizableText,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import type { PopoverProps } from "tamagui";
import { ExerciseTypes } from "../utils/enums";

export const ExercisePopover = ({
  title,
  subTitle,
  index,
  exerciseType,
  locked,
  ...props
}: PopoverProps & {
  title: string;
  subTitle: string;
  index: number;
  exerciseType: number;
  locked?: boolean;
}) => {
  return (
    <Popover
      placement="top"
      size="$5"
      allowFlip
      onOpenChange={() => {
        console.log("open change stuff");
      }}
      {...props}
    >
      <YGroup.Item key={index}>
        <Popover.Trigger asChild>
          <ListItem
            key={index}
            hoverTheme
            pressTheme
            title={title}
            subTitle={subTitle}
            icon={locked ? Lock : Unlock}
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
            <Adapt.Contents onOpenChange />
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
          <SizableText alignSelf="center">
            Do you wish to start the exercise?
          </SizableText>
          <Popover.Close>
            <Button
              size="$3"
              onPress={() => {
                console.log("Exercises started.");
                /* Custom code goes here, does not interfere with popover closure */
                switch (exerciseType) {
                  case ExerciseTypes.Vocabulary:
                    router.navigate(`exercises/vocabulary/${index}`);
                    break;
                  case ExerciseTypes.Listening:
                    router.navigate(`exercises/listening/${index}`);
                    break;
                  case ExerciseTypes.Grammar:
                    router.navigate(`exercises/grammar/${index}`);
                    break;
                  case ExerciseTypes.Speaking:
                    router.navigate(`exercises/speaking/${index}`);
                    break;
                }
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
