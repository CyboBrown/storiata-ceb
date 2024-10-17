import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Progress } from 'tamagui';

interface ComponentProps {
  title: string;
  subtitle: string;
  onPress: any;
}

export default function ExerciseCard({ title, subtitle, onPress }: ComponentProps) {
  return (
    <>
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

      </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    padding: 6,
    marginBottom: 10,
    marginLeft: "1.25%",
    marginRight: "1.25%",
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