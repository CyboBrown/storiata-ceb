import { Session } from "@supabase/supabase-js";
import type { TabsContentProps } from "tamagui";
import {
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  TamaguiProvider,
  Theme,
} from "tamagui";
// import { LayoutDashboard } from "@tamagui/lucide-icons";
import Dashboard from "./dashboard";
import ContributorDashbaord from "./dashboard_contributor";
import Exercises from "./exercises";
import Dictionary from "./dictionary";
import Account from "./account";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import config from "../tamagui.config";
import { StyleSheet, SafeAreaView, useColorScheme } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Avatar from "./avatar";
import { supabase } from "../src/utils/supabase";
import BottomNavAvatar from "./bottomnavbar_avatartest";
import HeaderTitle from "./appheader";

export default function Main({
  session,
  contribMode,
}: {
  session: Session;
  contribMode: boolean;
}) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("MAIN page loaded.");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="skyblue" />
      <HeaderTitle />
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Exercises") {
                iconName = focused ? "reader" : "reader-outline";
              } else if (route.name === "Dictionary") {
                iconName = focused ? "book" : "book-outline";
              } else if (route.name === "My Account") {
                return (
                  <BottomNavAvatar userID={session?.user.id} size={size} />
                );
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            swipeEnabled: true,
            tabBarActiveTintColor: "skyblue",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Home"
            children={() => <Dashboard session={session} />}
          />
          <Tab.Screen
            name="Exercises"
            children={() => <Exercises session={session} />}
          />
          <Tab.Screen
            name="Dictionary"
            children={() => <Dictionary session={session} />}
          />
          <Tab.Screen
            name="My Account"
            children={() => <Account session={session} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
