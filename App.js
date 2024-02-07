import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Welcome from './src/screens/welcome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';



export default function App() {

  const Stack = createStackNavigator();

  const[fontsLoaded] = useFonts({
    Rubik: require('./src/assets/fonts/Rubik-VariableFont_wght.ttf'),
    Archivo: require('./src/assets/fonts/ArchivoBlack-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}/> 
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
