import type { TabsContentProps } from "tamagui";
import { ScrollView, Separator, SizableText, Tabs } from "tamagui";
import Dashboard from "./dashboard";
import ContributorDashbaord from "./dashboard_contributor";
import Exercises from "./exercises";
import Dictionary from "./dictionary";
import Account from "./account";
import HeaderTitle from "../../src/components/HeaderTitle";
import NavAvatarIcon from "../../src/components/NavAvatarIcon";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useSession } from "../../src/services/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Main({contribMode}: {contribMode: boolean;}) {
  const { getUserUUID } = useSession();
  const BtmTabNavigator = createBottomTabNavigator();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="skyblue" />
      <HeaderTitle />
      <NavigationContainer independent={true}>
        <BtmTabNavigator.Navigator
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
                  <NavAvatarIcon userID={getUserUUID()} size={size} />
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
          <BtmTabNavigator.Screen
            name="Home"
            children={() => <Dashboard />}
          />
          <BtmTabNavigator.Screen
            name="Exercises"
            children={() => <Exercises />}
          />
          <BtmTabNavigator.Screen
            name="Dictionary"
            children={() => <Dictionary contribMode={contribMode}/>}
          />
          <BtmTabNavigator.Screen
            name="My Account"
            children={() => <Account />}
          />
        </BtmTabNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
