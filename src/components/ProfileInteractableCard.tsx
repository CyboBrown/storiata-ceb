import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ComponentProps {
  iconName: string,
  title: string,
  onPress: any
}

export default function ProfileInteractableCard({ iconName, title, onPress }: ComponentProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={24} color="dodgerblue" style={{marginRight: 10}} />
      <Text style={{fontSize: 16, flex: 1}}>{title}</Text>
      <Icon name="chevron-right" size={24} color="gray" style={{marginLeft: 10}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  }
});