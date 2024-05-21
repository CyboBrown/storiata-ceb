import React, { useEffect } from "react";
import config from "../tamagui.config";
import { Session } from "@supabase/supabase-js";
import { YStack, Text, View } from "tamagui";

export default function ContributorDashboard({
  session,
}: {
  session: Session;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("CONTRIBUTOR_DASHBOARD page loaded.");
  }, []);
  return (
    <>
    <View>
      <Text color="white"> WELCOME TO STORIATA </Text>
    </View>
      <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
        {/* <Paragraph color="$color" jc="center">
        Dashboard
      </Paragraph>
      <H5> </H5>
      <Button size="$4">Useless Button</Button> */}
      </YStack>
      <Text color="white"> Welcome Contributor</Text>
    </>
  );
}
