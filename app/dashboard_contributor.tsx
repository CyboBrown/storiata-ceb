import React, { useEffect } from "react";
import config from "../tamagui.config";
import { Session } from "@supabase/supabase-js";
import { YStack, Text } from "tamagui";

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
      <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
        {/* <Paragraph color="$color" jc="center">
        Dashboard
      </Paragraph>
      <H5> </H5>
      <Button size="$4">Useless Button</Button> */}
      </YStack>
      <Text color="black"> Welcome Contributor</Text>
    </>
  );
}
