import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ComponentProps {
  title: string;
  iconName: string;
  value: string;
  onChangeText: any;
  placeholder: any;
  enabled: boolean;
}

export default function LabeledTextInput ({ title, iconName, value, onChangeText, placeholder, enabled }: ComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
					editable={enabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
		color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 5,
  },
});