import { authentication, db } from "../../config";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { async } from "@firebase/util";

export const submitUserData = (navigation, name, gender, major, year, photoURL) => {
    setDoc(doc(db, "users", authentication.currentUser.uid), {
      name: name,
      gender: gender,
      major: major,
      year: year,
      email: authentication.currentUser.email,
      userID: authentication.currentUser.uid,
      matched: null,
      xp: 200,
      photoURL: photoURL,
      appState: appState
    }, {merge: true}).then(() => {
      // data saved successfully
      console.log('data submitted');
    }).catch((error) => {
      //the write failed
      console.log(error)
    });
    navigation.navigate('Login')
}

export const saveRole = (role) => {
    setDoc(doc(db, "users", authentication.currentUser.uid), {
      name: name,
      gender: gender,
      major: major,
      year: year,
      email: authentication.currentUser.email,
      userID: authentication.currentUser.uid,
      matched: null,
      xp: 200,
      photoURL: photoURL,
      appState: appState
    }, {merge: true}).then(() => {
      // data saved successfully
      console.log('data submitted');
    }).catch((error) => {
      //the write failed
      console.log(error)
    });
    navigation.navigate('Login')
}
