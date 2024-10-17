import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ExerciseTypeCard({ imageUrl, title, subtitle, onTextPress}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} />
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <TouchableOpacity onPress={onTextPress}>
          <Text style={styles.status}>ENTER EXERCISE</Text>
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