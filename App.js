import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Welcome from './src/screens/welcome';
import LoginVolunteer from './src/screens/volunteer/login';
import SignupVolunteer from './src/screens/volunteer/signup';
import LoginAdmin from './src/screens/admin/loginCopy';
import SignupAdmin from './src/screens/admin/signupCopy';
import HomeAdmin from './src/screens/admin/homeCopy';
import HomeVolunteer from './src/screens/volunteer/home';
import EditProfile from './src/screens/volunteer/editProfile';
import AdminChat from './src/screens/admin/adminChat';
import EventStats from './src/screens/admin/eventStats';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';


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
          <Stack.Screen name='LoginVol' component={LoginVolunteer} options={{ headerShown: false }}/> 
          <Stack.Screen name='SignupVol' component={SignupVolunteer} options={{ headerShown: false }}/> 
          <Stack.Screen name='LoginAdm' component={LoginAdmin} options={{ headerShown: false }}/> 
          <Stack.Screen name='SignupAdm' component={SignupAdmin} options={{ headerShown: false }}/> 
          <Stack.Screen name='HomeVol' component={HomeVolunteer} options={{ headerShown: false }}/> 
          <Stack.Screen name='HomeAdm' component={HomeAdmin} options={{ headerShown: false }}/> 
          <Stack.Screen name='EditProfile' component={EditProfile}  options={{ headerShown: false }} />
          <Stack.Screen name='AdminChat' component={AdminChat} options={{ headerShown: false }}/> 
          <Stack.Screen name='EventStats' component={EventStats} options={{ headerShown: false }} />
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
