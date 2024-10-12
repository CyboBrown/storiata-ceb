import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function UserDetails() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");

  const handleSave = () => {
    // Implement save logic here
    router.back(); // Redirect back to the account page after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit User Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

// Static export for navigation options in expo-router
export const UserDetailsOptions = {
  title: 'Edit User Details',
  headerStyle: { backgroundColor: 'dodgerblue' },
  headerTintColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});