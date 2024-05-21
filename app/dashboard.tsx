import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, View, YStack, Text} from "tamagui";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function Dashboard({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("USER_DASHBOARD page loaded.");
  }, []);

  return (
    <>
     <View justifyContent="center" alignItems="center" 
      <Text color="white" fontSize={40}> STORIATA </Text>
     </View>
     <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
      {/* <Paragraph color="$color" jc="center">
        Dashboard
      </Paragraph>
      <H5> </H5>
      <Button size="$4">Useless Button</Button> */}
      </YStack>
    </>
  );
}
