import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomeMenu from './src/components/HomeMenu';
import CreatePost from './src/screens/CreatePost';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>     
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{ headerShown: false }} />
        <Stack.Screen  name="CreatePost" component={CreatePost} options={{ title: 'Nuevo Posteo' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}