import React from "react";
import { Image } from "tamagui";
import { View, Text, StyleSheet } from "react-native";
import logo from "../assets/StoriaTa-Logo.png";

export default function HeaderTitle() {
  return (
    <View style={styles.headerTitleContainer}>
      <Image source={logo} height="$5" width="$5" />
      <Text style={styles.headerTitleText}>STORIATA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "8%",
    elevation: 2,
    backgroundColor: "white",
  },
  headerTitleText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black", // Adjust this color as needed
  },
});
