import React from 'react';
import { Text, TextStyle } from 'react-native';

const MaterialCommunityIcons = function ({ name, size = 20, color = 'inherit', style }: { name?: string; size?: number; color?: string; style?: TextStyle }) {
  return <Text style={[{ fontSize: size, color }, style]}>•</Text>;
};

export default MaterialCommunityIcons;
export { MaterialCommunityIcons };
