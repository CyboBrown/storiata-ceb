// CustomHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import icon from "../../src/assets/icon-baybayin.png";

interface CustomHeaderProps {
  pageTitle: string;
}

export default function CustomHeader ({ pageTitle }: CustomHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={icon}  // Adjust path to your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>StoriaTa | {pageTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});