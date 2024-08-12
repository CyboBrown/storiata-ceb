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
  Spacer,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import type { PopoverProps } from "tamagui";
import { ExerciseTypes } from "../utils/enums";
import { ExerciseService } from "../../src/services/ExerciseService";
import { useState } from "react";

export const ExercisePopover = ({
  user,
  title,
  subTitle,
  index,
  exerciseType,
  locked,
  ...props
}: PopoverProps & {
  user: string;
  title: string;
  subTitle: string;
  index: number;
  exerciseType: number;
  locked?: boolean;
}) => {
  const TEMP_USER_UUID = "3ad19072-1877-415d-bf5e-61c4bfe03977";
  const [commonWrongWords, setCommonWrongWords] = useState<string[]>();
  const [accessed, setAccessed] = useState<boolean>(false);

  const fetchAndSetCommonWrongWords = async () => {
    try {
      const words = await ExerciseService.getCommonMistakenWordsInExer(
        index,
        TEMP_USER_UUID
      );
      setCommonWrongWords(words);
    } catch (error) {
      console.error("Error fetching common wrong words:", error);
    }
  };
  const fetchAccessedStatus = async () => {
    try {
      const words = await ExerciseService.getCommonMistakenWordsInExer(
        index,
        TEMP_USER_UUID
      );
      setCommonWrongWords(words);
    } catch (error) {
      console.error("Error fetching common wrong words:", error);
    }
  };

  fetchAndSetCommonWrongWords();

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
        <YStack space="$2">
          <SizableText alignSelf="center" fontSize={16} lineHeight={16}>
            Vocabulary Exercise No. {index}
          </SizableText>
          <Spacer></Spacer>
          <SizableText
            alignSelf="center"
            fontSize={32}
            lineHeight={32}
            fontWeight={800}
          >
            {title}
          </SizableText>
          <SizableText
            alignSelf="center"
            textAlign="center"
            fontSize={15}
            lineHeight={15}
          >
            {subTitle}
          </SizableText>
          <Spacer></Spacer>
          <SizableText
            alignSelf="center"
            textAlign="center"
            fontSize={15}
            lineHeight={15}
            fontWeight={800}
          >
            COMMON MISTAKEN WORDS:
          </SizableText>
          <SizableText
            alignSelf="center"
            textAlign="center"
            fontSize={15}
            lineHeight={15}
          >
            {commonWrongWords?.join(", ")}
          </SizableText>
        </YStack>
        <Spacer></Spacer>
        <YStack space="$3">
          <SizableText alignSelf="center">
            Do you wish to start the exercise?
          </SizableText>
          <Popover.Close>
            <Button
              size="$3"
              onPress={() => {
                console.log("Exercises started.");
                ExerciseService.hasUserAccessedExercise(index, user);
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
