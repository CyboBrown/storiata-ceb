import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, View, YStack, Text, ScrollView, Card, CardBackground, CardFooter, CardHeader, XStack } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function Dashboard({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("USER_DASHBOARD page loaded.");
  }, []);

  return (
    <>
      <View justifyContent="center" alignItems="center">
        <Text color="white" fontSize={40}> STORIATA </Text>
      </View>
      <ScrollView>
        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Text color="white" fontSize={25}> Continue Lessons</Text>
        </View>
        <XStack marginTop="$2">
          <ScrollView horizontal>
            <Card elevate size={4} bordered height={150} width={300} marginStart={"$3"}>
                <CardHeader/>
                <CardFooter/>
                {}
                <CardBackground/>
            </Card>
            <Card elevate size={4} bordered height={150} width={300} marginStart={"$3"}>
                <CardHeader/>
                <CardFooter/>
                {}
                <CardBackground/>
            </Card>
          </ScrollView>
        </XStack>

        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Text color="white" fontSize={25}> Explore Lessons</Text>
        </View>
        <Card elevate size={4} bordered height={150} marginStart={"$5"} marginTop={"$3"} marginEnd={"$5"}>
            <CardHeader/>
            <CardFooter/>
            {}
            <CardBackground/>
        </Card>
        <Card elevate size={4} bordered height={150} marginStart={"$5"} marginTop={"$3"} marginEnd={"$5"}>
          <CardHeader/>
          <CardFooter/>
          {}
          <CardBackground/>
        </Card>
        <Card elevate size={4} bordered height={150} marginStart={"$5"} marginTop={"$3"} marginEnd={"$5"}>
          <CardHeader/>
          <CardFooter/>
          {}
          <CardBackground/>
        </Card>
        <Card elevate size={4} bordered height={150} marginStart={"$5"} marginTop={"$3"} marginEnd={"$5"}>
          <CardHeader/>
          <CardFooter/>
          {}
          <CardBackground/>
        </Card>
      </ScrollView>
    </>
  );
}
