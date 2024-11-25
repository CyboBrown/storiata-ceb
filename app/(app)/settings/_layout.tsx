import { Text, TouchableOpacity } from "react-native";
import { Stack, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SettingsLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="user-details"
        options={{
          title: "Edit User Details",
          headerBackTitle: "Back",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "dodgerblue" },
          headerTitleStyle: { fontWeight: "bold", fontSize: 21 },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
          ),
          presentation: "modal",
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
