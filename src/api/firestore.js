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

export const setUserRole = (role, navigation) => {
    setDoc(doc(db, "users", authentication.currentUser.uid), {
      role: role
    }, {merge: true}).then(() => {
      // data saved successfully
      console.log('data submitted');
    }).catch((error) => {
      //the write failed
      console.log(error)
    });
    navigation.navigate('Login')
}


export const fetchEvents = () => new Promise(async (resolve) => {
  const q = query(collection(db, "events"));
  const documentSnapshot = await getDocs(q);
  const events = [];
  documentSnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    let item = {id, ...data};
    users.push(item);
  })
  resolve(events);
})


export const fetchChatrooms =  () => new Promise(async(resolve) =>  {
  const q = query(collection(db, 'events'));
  let chats = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    chats.push({...data});
    console.log(chats);
  })
  resolve(chats);
})

export const getCurrentUserName =  () => new Promise(async(resolve) =>  {
  const userRef = doc(db, 'users', authentication.currentUser.uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    console.log(userSnap.data().name)
    resolve(userSnap.data().name); // Assuming the field for the user's name is 'name'
  } else {
    // Handle the case where the user doesn't exist in the database
  } 
})

export const saveVolunteerData = (eventName, name, gender, age, workStatus, interests, skills, username) => {
  setDoc(doc(db, "events", eventName, "volunteers", authentication.currentUser.uid), {
    name: name,
    gender: gender,
    age: age,
    workStatus: workStatus,
    interests: interests, 
    skills: skills,
    username: username
  }, {merge: true}).then(() => {
    // data saved successfully
    console.log('data submitted');
  }).catch((error) => {
    //the write failed
    console.log(error)
  });
}
