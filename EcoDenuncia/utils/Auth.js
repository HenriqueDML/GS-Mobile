import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado no AsyncStorage');
      return null;
    }

    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded);
    return decoded.sub;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};
