import { Button } from "react-native";
import { Stack, useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsLayout() {
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
        name="user-details" 
        options={{
          title: 'Edit User Details',
          headerBackTitle: 'Back',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'dodgerblue' },
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerRight: () => (
            <Button 
              onPress={() => alert('Save Changes')}
              title="Save" 
              color="dodgerblue"
            />
          ),
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