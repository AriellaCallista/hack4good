import { authentication, db } from '../../config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert } from 'react-native';
import { collection, getDocs, setDoc, query, doc } from 'firebase/firestore';


export const signup = async ( navigation, email, password, username ) => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const list = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.get('username'));
  })
  if (list.includes(username)) {
    Alert.alert('Username taken, please try another one')
  } else {
    await createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        setDoc(doc(db, "users", authentication.currentUser.uid), {
          username: username
        }, {merge : true});
        navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log('Error', error);
        Alert.alert('' + error);
      });  
  }
};

export async function login (navigation, email, password, appState ) {
    console.log('login called');
    await signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log('User logged in successfully:',  userCredential);
        setDoc(doc(db, "users", authentication.currentUser.uid), {
          appState: appState
        }, { merge: true })
        navigation.navigate('Main Tab')
      })
      .catch((error) => {
        console.log('Error at login ', error);
        Alert.alert('Error at login ' + error);
      });
};