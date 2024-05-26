import React, { useEffect, useState } from "react";
import config from "../tamagui.config";
import { Session } from "@supabase/supabase-js";
import { YStack, Text, View, Input, Card, CardHeader, CardFooter, CardBackground, ScrollView } from "tamagui";

export default function ContributorDashboard({
  session,
}: {
  session: Session;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("CONTRIBUTOR_DASHBOARD page loaded.");
  }, []);

  const[search, setSearch] = useState("");

  return (
    <ScrollView>
    <View justifyContent="center" alignItems="center">
      <Text color="white" fontSize={40}>STORIATA</Text>
    </View>
    <View marginStart="$5" marginTop="$3" marginEnd="$5">
      <Input
        size="$4"
        placeholder="search contribution"
        value={search}
        onChangeText={(text) => setSearch(text)}/>
    </View>
    <View marginStart="$2" marginTop="$3" marginEnd="$2">
      <Text color="white" fontSize={25}>  Featured Contributions</Text>
    </View>
    <View marginStart="$5" marginTop="$3" marginEnd="$5">
      <Card elevate size={4} bordered height={150}>
        <CardHeader/>
        <CardFooter/>
        {}
        <CardBackground/>
      </Card>
    </View>
    <View marginStart="$2" marginTop="$5" marginEnd="$2">
      <Text color="white" fontSize={25}>  Recent Contributions</Text>
    </View>
    <View marginStart="$5" marginTop="$3" marginEnd="$5">
      <Card elevate size={4} bordered height={150}>
        <CardHeader/>
        <CardFooter/>
        {}
        <CardBackground/>
      </Card>
    </View>
    </ScrollView>
  );
}
