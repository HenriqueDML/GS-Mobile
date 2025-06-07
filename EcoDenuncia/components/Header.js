import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({ showBackButton = false }) {
  const navigation = useNavigation();

  const handleLogoPress = () => {
    navigation.navigate('MainApp', { screen: 'MenuPrincipal' });
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainApp', { screen: 'MenuPrincipal' });
    }
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.iconButtonContainer}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButtonContainer} />
      )}

      <Text style={styles.headerText}>EcoDenuncia</Text>

      <TouchableOpacity onPress={handleLogoPress} style={styles.iconButtonContainer}>
        <Image source={require('../assets/logobranca.png')} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: '#003366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  iconButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
