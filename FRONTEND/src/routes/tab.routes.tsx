import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import CrudScreen from '../screens/CrudScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'CrudScreen') {
            iconName = focused ? 'list' : 'list-outline';
          }

          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6a0dad',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Cadastro" component={Cadastro} />
      <Tab.Screen name="CrudScreen" component={CrudScreen} />
    </Tab.Navigator>
  );
}
