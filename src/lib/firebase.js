import Firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const config = {
	apiKey: "AIzaSyBfi2dq71nYYZRlKDWgpa7lvyXBXOh-qXo",
	authDomain: "instagram-1138a.firebaseapp.com",
	projectId: "instagram-1138a",
	storageBucket: "instagram-1138a.appspot.com",
	messagingSenderId: "498465647294",
	appId: "1:498465647294:web:1ceb0b44d19bdeb0bbccef"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
