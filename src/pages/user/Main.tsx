import { Session } from "@supabase/supabase-js";
import type { TabsContentProps } from "tamagui";
import { H5, ScrollView, Separator, SizableText, Tabs, YStack } from "tamagui";
import { LayoutDashboard } from "@tamagui/lucide-icons";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Exercises from "./Exercises";
import Dictionary from "./Dictionary";

export default function Main({ session }: { session: Session }) {
  return (
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
        <Dashboard session={session}></Dashboard>
      </TabsContent>
      <TabsContent value="tab2">
        <Exercises session={session}></Exercises>
      </TabsContent>
      <TabsContent value="tab3">
        <Dictionary session={session}></Dictionary>
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
            Dashboard
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
  );
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
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
