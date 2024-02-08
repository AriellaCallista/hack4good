import { setDoc, doc, collection, addDoc } from "firebase/firestore"
import { authentication } from "../../config"
import { db } from "../../config"
import { saveMediaToStorage } from "./random"
import { onAuthStateChanged } from "firebase/auth"


// save photoURL to firestore and storage
export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${authentication.currentUser.uid}`)
        .then((downloadUrl) => {
            setDoc(doc(db, "users", authentication.currentUser.uid), {
                photoURL: downloadUrl
            }, { merge: true })
            .then(() => resolve(Date.now())) 
    })
})