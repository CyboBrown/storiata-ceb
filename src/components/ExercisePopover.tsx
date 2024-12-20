import {
  BadgeCheck,
  BookOpenCheck,
  Check,
  CheckCheck,
  CheckSquare,
  ChevronRight,
  CopyCheck,
  Hash,
  Lock,
  SpellCheck,
  Trophy,
  Unlock,
  UserCheck,
} from "@tamagui/lucide-icons";
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
import { useSession } from "../contexts/AuthContext";

export const ExercisePopover = ({
  user,
  title,
  subTitle,
  index,
  exerciseType,
  locked,
  finished,
  ...props
}: PopoverProps & {
  user: string;
  title: string;
  subTitle: string;
  index: number;
  exerciseType?: number;
  locked?: boolean;
  finished?: boolean;
}) => {
  const [commonWrongWords, setCommonWrongWords] = useState<string[]>();
  const [accessed, setAccessed] = useState<boolean>(false);

  const { getUserUUID } = useSession();

  const fetchAndSetCommonWrongWords = async () => {
    try {
      const words = await ExerciseService.getCommonMistakenWordsInExer(
        index,
        getUserUUID() ?? ""
      );
      setCommonWrongWords(words);
    } catch (error) {
      console.error("Error fetching common wrong words:", error);
    }
  };

  //fetchAndSetCommonWrongWords();

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
            icon={finished ? Trophy : locked ? Lock : Unlock}
            iconAfter={ChevronRight}
            onPress={() => {
              console.log("EXERCISE_POPOVER_TRIGGERED");
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
          {/* <Spacer></Spacer>
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
          </SizableText> */}
        </YStack>
        <Spacer></Spacer>
        <YStack space="$3">
          <SizableText alignSelf="center">
            Do you wish to start the exercise?
          </SizableText>
          <Popover.Close>
            <Button
              size="$3"
              onPress={async () => {
                console.log("Exercises started.");
                ExerciseService.hasUserAccessedExercise(index, user);
                const exerType =
                  exerciseType ||
                  (await ExerciseService.getExerciseDetails(index))?.type;
                /* Custom code goes here, does not interfere with popover closure */
                switch (exerType) {
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
          <Button
            size="$3"
            onPress={async () => {
              console.log("Exercises edit displayed.");
              const exerType =
                exerciseType ||
                (await ExerciseService.getExerciseDetails(index))?.type;
              /* Custom code goes here, does not interfere with popover closure */
              switch (exerType) {
                case ExerciseTypes.Vocabulary:
                  router.navigate(`exercises/vocabulary/${index}/edit`);
                  break;
                case ExerciseTypes.Listening:
                  router.navigate(`exercises/listening`);
                  break;
                case ExerciseTypes.Grammar:
                  router.navigate(`exercises/grammar/${index}/edit`);
                  break;
                case ExerciseTypes.Speaking:
                  router.navigate(`exercises/speaking`);
                  break;
              }
            }}
          >
            Edit Exercise
          </Button>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};
