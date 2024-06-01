import { Session } from "@supabase/supabase-js";
import {
  Button,
  H5,
  Paragraph,
  View,
  YStack,
  Text,
  ScrollView,
  Card,
  CardBackground,
  CardFooter,
  CardHeader,
  XStack,
} from "tamagui";
import { useEffect, useState } from "react";
import LessonCard from "../src/components/LessonCard";

export default function Dashboard({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("USER_DASHBOARD page loaded.");
  }, []);


  return (
    <View justifyContent="center" alignItems="center">
      <View justifyContent="center" alignItems="center">
        <Text color={"$color"} fontSize={"$10"}>
          {" "}
          STORIATA{" "}
        </Text>
      </View>
      <ScrollView marginBottom="$5">
      <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Card elevate height={"$15"} bordered>
            <CardHeader padded>
              <Text color={"$color"} fontSize={26}>StoriaTa Progress</Text>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>Lessons Completed: </Text>
                <Text color={"$color"} fontSize={"$7"}>50</Text>
              </XStack>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>Word Count: </Text>
                <Text color={"$color"} fontSize={"$7"}>25</Text>
              </XStack>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>Average Rating: </Text>
                <Text color={"$color"} fontSize={"$7"}>96%</Text>
              </XStack>
            </CardHeader>
            <CardFooter padded>

            </CardFooter>
            <CardBackground>

            </CardBackground>
          </Card>
        </View>
        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Card elevate bordered height={300}>
            <CardHeader padded>
              <Text color={"$color"} fontSize={25}>Recent</Text>
              <LessonCard title="Sample" details="Sample Details" />
            </CardHeader>
            <CardFooter padded>
              
            </CardFooter>
            <CardBackground>
              
            </CardBackground>
          </Card>
        </View>
        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Card elevate bordered height={300}>
            <CardHeader padded>
              <Text color={"$color"} fontSize={25}>Explore More Exercises</Text>
              <Text color={"$color"} fontSize={20}>To expand your skills in...</Text>
              <YStack>
              
              </YStack>
            </CardHeader>
            <CardFooter padded>
              <XStack flex={1}/>
              <Button size="$4">Start now</Button> 
            </CardFooter>
            <CardBackground>
            </CardBackground>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
