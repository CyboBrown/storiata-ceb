import { Tabs } from "expo-router";
import { useSession } from "../../../src/contexts/AuthContext";
import NavAvatarIcon from "../../../src/components/NavAvatarIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabsLayout() {
  const { getUserUUID, session, isLoading } = useSession();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "dodgerblue",
      tabBarInactiveTintColor: "gray",
      headerShown: true,
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            return focused
              ? <Icon name="home-circle" size={size} color={color} />
              : <Icon name="home-circle-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ focused, color, size }) => {
            return focused
              ? <Icon name="bullseye-arrow" size={size} color={color} />
              : <Icon name="bullseye" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: "Dictionary",
          tabBarIcon: ({ focused, color, size }) => {
            return focused
              ? <Icon name="book-open-page-variant" size={size} color={color} />
              : <Icon name="book-open-page-variant-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My Account",
          tabBarIcon: ({ size }) => <NavAvatarIcon userID={getUserUUID()} size={size} />,
        }}
      />
    </Tabs>
  );
}
