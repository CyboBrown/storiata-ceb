import { Text, View, YStack } from "tamagui";

export const OptionCard = ({
  text,
  representation,
}: {
  text: string;
  representation?: string;
}) => {
  return (
    <YStack
      jc="flex-start"
      ai="center"
      //   m="$5"
      p="$5"
      gap="$2"
      borderColor={"$color5"}
      borderRadius="$5"
      borderWidth="$1"
      width="40%"
    >
      {!representation || <Text fontSize={50}>{representation}</Text>}
      <Text fontSize={20} fontWeight={400} color={"$color"}>
        {text}
      </Text>
    </YStack>
  );
};
