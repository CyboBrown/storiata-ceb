import React, { useEffect, useState } from "react";
import config from "../../tamagui.config";
import { Session } from "@supabase/supabase-js";
import {
  YStack,
  Text,
  View,
  Input,
  Card,
  CardHeader,
  CardFooter,
  CardBackground,
  ScrollView,
  XStack,
} from "tamagui";
import LessonCard from "../../src/components/LessonCard";

export default function ContributorDashboard({
  session,
}: {
  session: Session;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("CONTRIBUTOR_DASHBOARD page loaded.");
  }, []);

  const [search, setSearch] = useState("");

  return (
    <>
      <View justifyContent="center" alignItems="center" overflow="scroll">
        <Text color={"$color"} fontSize={40}>
          STORIATA
        </Text>
      </View>
      <ScrollView>
        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Card elevate size={4} bordered height={200}>
            <CardHeader padded>
              <Text color={"$color"} fontSize={26}>
                Contributor Dashboard
              </Text>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>
                  Total Contribution:{" "}
                </Text>
                <Text color={"$color"} fontSize={"$7"}>
                  50
                </Text>
              </XStack>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>
                  Total Views:{" "}
                </Text>
                <Text color={"$color"} fontSize={"$7"}>
                  50
                </Text>
              </XStack>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>
                  Total Likes:{" "}
                </Text>
                <Text color={"$color"} fontSize={"$7"}>
                  50
                </Text>
              </XStack>
            </CardHeader>
            <CardFooter padded></CardFooter>
            <CardBackground></CardBackground>
          </Card>
        </View>
        <View marginStart="$2" marginTop="$5" marginEnd="$2">
          <Text color={"$color"} fontSize={25}>
            {" "}
            Recent Contributions
          </Text>
        </View>
        <LessonCard title="Sample" details="Sample Details" />
        <LessonCard title="Sample" details="Sample Details" />
        <LessonCard title="Sample" details="Sample Details" />
      </ScrollView>
    </>
  );
}
