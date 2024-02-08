import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Welcome from './src/screens/welcome';
import Login from './src/screens/login';
import Signup from './src/screens/signup';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CreateEvent from './src/screens/createEvent';


export default function App() {

  const Stack = createStackNavigator();

  const[fontsLoaded] = useFonts({
    Rubik: require('./src/assets/fonts/Rubik-VariableFont_wght.ttf'),
    Archivo: require('./src/assets/fonts/ArchivoBlack-Regular.ttf'),
    Protest: require('./src/assets/fonts/ProtestStrike-Regular.ttf'),
    Lilita: require('./src/assets/fonts/LilitaOne-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}/> 
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/> 
          <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/> 
          <Stack.Screen name='CreateEvent' component={CreateEvent} options={{ headerShown: false }}/> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
