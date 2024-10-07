import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface SquareProps extends TouchableOpacityProps {
  color: string;
  imageSource: string;
  title: string;
  description: string;
}

export default function SquareItem({
  imageSource,
  title,
  description,
  onPress,
}: SquareProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.square}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 250,
    height: 400,
    margin: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "45%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: "cover",
  },
  title: {
    color: "darkslategray",
    paddingLeft: "8%",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    color: "gray",
    paddingLeft: "8%",
    paddingRight: "8%",
  },
});
