import React, { FC, version } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface MyButtonProps {
  color: string;
  title: string;
  onPress: () => void;
}

const mButton: FC<MyButtonProps> = ({ color, title, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default mButton;