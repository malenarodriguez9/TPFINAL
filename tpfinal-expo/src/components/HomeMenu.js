import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


import Profile from '../screens/Profile';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
    return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />}} />
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}/>
    </Tab.Navigator>
    )
}