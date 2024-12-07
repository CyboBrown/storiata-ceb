import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ComponentProps {
  iconName: string;
  title: string;
  description: string;
}

export default function ProfileTabItem({
  iconName,
  title,
  description,
}: ComponentProps) {
  return (
    <View style={styles.itemContainer}>
      <Icon
        name={iconName}
        size={24}
        color="dodgerblue"
        style={{ marginRight: 10 }}
      />
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 16 }}>{title + " "}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 12, color: "gray", marginLeft: "auto",}}>{description}</Text>
          {description + " "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 1,
  },
});
