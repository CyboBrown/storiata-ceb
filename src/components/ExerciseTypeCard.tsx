import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ComponentProps {
  imageUrl: ImageSourcePropType;
  title: string;
  subtitle: string,
  onTextPress: any;
}

export default function ExerciseTypeCard({ imageUrl, title, subtitle, onTextPress}: ComponentProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} />
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <TouchableOpacity onPress={onTextPress} style={{flexDirection: "row", alignItems: "center"}}>
          <Icon name="arrow-right" size={28} color="dodgerblue" />
          <Text style={styles.status}>GO TO EXERCISE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container (Black outline)
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 5,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  durationContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  status: {
    fontSize: 15,
    fontWeight: '700',
    color: "dodgerblue"
  },
});