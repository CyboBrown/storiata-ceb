import { Session } from "@supabase/supabase-js";
import type { TabsContentProps } from "tamagui";
import { ScrollView, Separator, SizableText, Tabs } from "tamagui";
// import { LayoutDashboard } from "@tamagui/lucide-icons";
import Dashboard from "./dashboard";
import ContributorDashbaord from "./dashboard_contributor";
import Exercises from "./exercises";
import Dictionary from "./dictionary";
import Account from "./account";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { compareCebuanoWords } from "../src/utils/compare";

export default function Main({
  session,
  contribMode,
}: {
  session: Session;
  contribMode: boolean;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("MAIN page loaded.");
  }, []);

  return (
    <>
      <StatusBar translucent hidden style="auto" />
      <Tabs
        fullscreen
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        minWidth={250}
        minHeight={400}
        overflow="hidden"
        borderColor="$borderColor"
      >
        <TabsContent value="tab1">
          {contribMode ? (
            <ContributorDashbaord session={session}></ContributorDashbaord>
          ) : (
            <Dashboard session={session}></Dashboard>
          )}
        </TabsContent>
        <TabsContent value="tab2">
          <Exercises session={session}></Exercises>
        </TabsContent>
        <TabsContent value="tab3">
          <Dictionary session={session} contribMode={contribMode}></Dictionary>
        </TabsContent>
        <TabsContent value="tab4">
          <ScrollView>
            <Account key={session.user.id} session={session}></Account>
          </ScrollView>
        </TabsContent>
        <Separator />
        <Tabs.List
          separator={<Separator vertical />}
          disablePassBorderRadius="top"
          aria-label="NavBar"
        >
          <Tabs.Tab flex={1} value="tab1">
            <SizableText fontFamily="$body" fontSize={10}>
              {contribMode ? "Dashboard" : "Home"}
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab2">
            <SizableText fontFamily="$body" fontSize={10}>
              Exercises
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab3">
            <SizableText fontFamily="$body" fontSize={10}>
              Dictionary
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab4">
            <SizableText fontFamily="$body" fontSize={10}>
              Account
            </SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key={props.value}
      padding="$2"
      alignItems="stretch"
      justifyContent="center"
      flex={1}
      {...props}
    >
      {props.children}
    </Tabs.Content>
  );
};
