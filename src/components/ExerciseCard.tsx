import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ExerciseCard({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name="book" size={50} color="gray" />
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Icon name="chevron-right" size={30} color="gray" style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 5,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
  },
  arrow: {
    marginLeft: 10,
  },
});