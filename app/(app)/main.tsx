import Dashboard from "./dashboard";
import Exercises from "./exercises";
import Dictionary from "./dictionary";
import Account from "./account";
import NavAvatarIcon from "../../src/components/NavAvatarIcon";
import { useSession } from "../../src/services/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ContributorDashboard from "./dashboard_contributor";

export default function Main({contribMode}: {contribMode: boolean;}) {
  const { getUserUUID } = useSession();
  const BtmTabNavigator = createBottomTabNavigator();
  const colorScheme = useColorScheme();

  return (
    <>
      <NavigationContainer independent={true}>
      <BtmTabNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-circle" : "home-circle-outline";
            } else if (route.name === "Exercises") {
              iconName = focused ? "bullseye-arrow" : "bullseye";
            } else if (route.name === "Dictionary") {
              iconName = focused ? "book-open-page-variant" : "book-open-page-variant-outline";
            } else if (route.name === "My Account") {
              return <NavAvatarIcon userID={getUserUUID()} size={size} />;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "gray",
          headerShown: true,
          headerStyle: { backgroundColor: 'dodgerblue' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >

          {contribMode ? (
            <BtmTabNavigator.Screen
              name="Home"
              children={() => <ContributorDashboard />}
            />
          ) : (
            <BtmTabNavigator.Screen
              name="Home"
              children={() => <Dashboard />}
            />
          )}

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
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
