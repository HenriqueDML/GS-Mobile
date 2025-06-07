import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const lightBlue = '#ADD8E6';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>© 2025 EcoDenuncia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 90,
    backgroundColor: '#003366',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
