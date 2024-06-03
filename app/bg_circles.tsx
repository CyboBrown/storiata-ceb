import React from 'react';
import { View, StyleSheet } from 'react-native';

interface BackgroundCircleProps {
  size: number;
  color: string;
  top: number;
  left: number;
}

const BackgroundCircle: React.FC<BackgroundCircleProps> = ({ size, color, top, left }) => {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: color, top, left }]} />
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
  },
});

export default BackgroundCircle;