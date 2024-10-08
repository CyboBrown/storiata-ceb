import { useState } from "react";
import { Spinner, Text, View, YStack } from "tamagui";

export const OptionCard = ({
  index,
  text,
  representation,
  setSelected,
  selected,
  correct,
  incorrect,
  disabled,
  lengthy,
}: {
  index: number;
  text?: string;
  representation?: string;
  setSelected?: React.Dispatch<React.SetStateAction<number>>;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  lengthy?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <YStack
      jc="flex-start"
      ai="center"
      //   m="$5"
      px="$5"
      py={lengthy ? "$3" : "$5"}
      gap="$2"
      borderColor={"$color5"}
      borderRadius="$5"
      borderWidth="$1"
      width={lengthy ? "90%" : "40%"}
      backgroundColor={
        correct
          ? "$green7"
          : incorrect
          ? "$red7"
          : selected
          ? "$blue7"
          : hovered
          ? "$backgroundHover"
          : focused
          ? "$backgroundFocus"
          : pressed
          ? "$backgroundPress"
          : "$background"
      }
      onFocus={() => {
        setFocused(true);
        setHovered(false);
        setPressed(false);
      }}
      onHoverIn={() => {
        setFocused(false);
        setHovered(true);
        setPressed(false);
      }}
      onHoverOut={() => setFocused(false)}
      onPressIn={() => {
        setFocused(false);
        setHovered(false);
        setPressed(true);
      }}
      onPressOut={() => {
        setPressed(false);
        if (setSelected) setSelected(index);
      }}
      disabled={disabled}
    >
      {representation == "⛔" ? (
        <Spinner size="large" color="$blue9" m="$2" />
      ) : !representation ? (
        ""
      ) : (
        <Text fontSize={50}>{representation}</Text>
      )}
      {!text || (
        <Text
          fontSize={20}
          fontWeight={400}
          color={"$color"}
          // color={
          //   hovered
          //     ? "$colorHover"
          //     : focused
          //     ? "$colorFocus"
          //     : pressed
          //     ? "$colorPress"
          //     : "$color"
          // }
        >
          {text}
        </Text>
      )}
    </YStack>
  );
};
