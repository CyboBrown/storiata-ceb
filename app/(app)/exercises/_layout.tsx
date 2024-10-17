import { Text, TouchableOpacity } from "react-native";
import { Stack, useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ExercisesLayout() {
  const navigation = useNavigation();

  return (
    <Stack
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
    >
      <Stack.Screen 
        name="vocabulary" 
        options={{
          title: 'Exercises',
          headerBackTitle: 'Back',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'dodgerblue' },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon 
              name="arrow-left" 
              size={24} 
              color="white" 
              onPress={() => navigation.goBack()}
            />
          ),
          presentation: 'modal',
          gestureEnabled: true,
        }} 
      />

      <Stack.Screen 
        name="grammar" 
        options={{
          title: 'Exercises',
          headerBackTitle: 'Back',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'dodgerblue' },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon 
              name="arrow-left" 
              size={24} 
              color="white" 
              onPress={() => navigation.goBack()}
            />
          ),
          presentation: 'modal',
          gestureEnabled: true,
        }} 
      />

      <Stack.Screen 
        name="listening" 
        options={{
          title: 'Exercises',
          headerBackTitle: 'Back',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'dodgerblue' },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon 
              name="arrow-left" 
              size={24} 
              color="white" 
              onPress={() => navigation.goBack()}
            />
          ),
          presentation: 'modal',
          gestureEnabled: true,
        }} 
      />
    </Stack>
  );
}