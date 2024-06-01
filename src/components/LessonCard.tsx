import { FC } from 'react';
import { Button, Card, CardBackground, CardFooter, CardHeader, Text, View, XStack, YStack} from "tamagui";


interface LessonCardProps {
  title: string;
  details?: string;
}

const LessonCard: FC<LessonCardProps> = ({ title, details}) => {
  return (
    <>
      <Card elevate size={4} bordered height={200} width={325} marginStart={"$7"} marginTop={"$3"}>
        <CardHeader padded>
         <Text fontSize={"$6"} marginBottom="$2">{title}</Text>
         <Text>{details}</Text>
        </CardHeader>
        <CardFooter padded>
          <YStack flex={1}>
            <Text> Views: </Text>
            <Text> Rating: </Text>
          </YStack>
          <Button size="$4">Start</Button> 
        </CardFooter>
        <CardBackground>
        </CardBackground>
      </Card>
    </>
  );
};

export default LessonCard;