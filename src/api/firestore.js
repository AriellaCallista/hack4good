import { authentication, db, storage } from "../../config";
import { setDoc, doc, getDocs, query, collection, where, getDoc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { async } from "@firebase/util";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"

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


export const fetchAdminChatrooms =  () => new Promise(async(resolve) =>  {
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

export const saveVolunteerData = (eventName, name, gender, workStatus, interests, skills, username) => {
  setDoc(doc(db, "events", eventName, "volunteers", authentication.currentUser.uid), {
    name: name,
    gender: gender,
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

export const saveEventData = (event) => {
  setDoc(doc(db, "users", authentication.currentUser.uid, "events", event.newEvent), {
    newEvent: event.newEvent,
    newEventDesc: event.newEventDesc,
    eventDate: event.eventDate,
    appFormLink: event.appFormLink
  }, {merge: true})
}

export const fetchUserChatrooms =  () => new Promise(async(resolve) =>  {
  const q = query(collection(db, 'users', authentication.currentUser.uid, 'events'));
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

export const saveAttCode = (code, event) => {
  setDoc(doc(db, "events", event), {
    attCode: code
  }, {merge: true})
}


export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
  saveMediaToStorage(image, `profileImage/${authentication.currentUser.uid}`)
      .then((downloadUrl) => {
        console.log('saving')
          setDoc(doc(db, "users", authentication.currentUser.uid), {
              photoURL: downloadUrl
          }, { merge: true })
          .then(() => resolve(Date.now())) 
  })
})

export const saveMediaToStorage = (media, path) => new Promise(async (resolve, reject) => {
  const fileRef = ref(storage, path) ;

  const img = await fetch(media);
  const blob = await img.blob();

  console.log("uploading image");
  const uploadTask = uploadBytesResumable(fileRef, blob);

  uploadTask.on('state_changed',(snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
             console.log('Upload is paused');
         break;
         case 'running':
            console.log('Upload is running');
         break;
      }
   },
   (error) => {
      this.setState({ isLoading: false })
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
         case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");
         break;
         case 'storage/canceled':
            console.log("User canceled the upload");
         break;
         case 'storage/unknown':
            console.log("Unknown error occurred, inspect error.serverResponse");
         break;
      }
   },
   () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);

         
      });
   }); 
})
