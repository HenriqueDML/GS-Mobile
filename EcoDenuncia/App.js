import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import MenuPrincipal from './screens/MenuPrincipal';
import Denuncia from './screens/Denuncia';
import AcompanharDenuncia from './screens/AcompanharDenuncia';
import OrgaosPublicos from './screens/OrgaosPublicos';
import SobreNos from './screens/SobreNos';
import Perfil from './screens/Perfil';
import SideMenu from './components/SideMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#111',
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="MenuPrincipal" component={MenuPrincipal} />
      <Drawer.Screen name="Denuncia" component={Denuncia} />
      <Drawer.Screen name="AcompanharDenuncia" component={AcompanharDenuncia} />
      <Drawer.Screen name="OrgaosPublicos" component={OrgaosPublicos} />
      <Drawer.Screen name="SobreNos" component={SobreNos} />
    </Drawer.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainApp" component={MainDrawerNavigator} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
