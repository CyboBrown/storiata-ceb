import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Card, CardBackground, CardFooter, CardHeader, Image, Text } from "tamagui";


interface LessonCardProps {
  image?: ImageSourcePropType;
  title: string;
  details?: string;
}

const LessonCard: FC<LessonCardProps> = ({ image, title, details}) => {
  return (
    <>
      <Card elevate size={4} bordered height={150} width={300} marginStart={"$7"} marginTop={"$3"}>
        <CardHeader>
         <Text> Sample</Text>
        </CardHeader>
        <CardFooter>
          <Text>{details}</Text>
        </CardFooter>
        <CardBackground>
        </CardBackground>
      </Card>
    </>
  );
};

export default LessonCard;