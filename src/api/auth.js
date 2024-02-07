import { authentication, db } from '../../config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert } from 'react-native';
import { collection, getDocs, setDoc, query, doc } from 'firebase/firestore';

export const signup = async ( navigation, name, username, email, password, role ) => {
  await createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        setDoc(doc(db, "users", authentication.currentUser.uid), {
          name: name,
          username: username,
          role: role
        }, {merge : true});
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('Error', error);
        Alert.alert('' + error);
      });  
};


export async function login (navigation, email, password, role) {
    console.log('login called');
    await signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log('User logged in successfully:',  userCredential);
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.log('Error at login ', error);
        Alert.alert('Error at login ' + error);
      });
};