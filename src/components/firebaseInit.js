import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Create the firebase all from the config object
const firebaseApp = firebase.initializeApp(firebaseConfig)

function firestore() {
	return firebaseApp.firestore();
}

function auth() {
	return firebaseApp.auth();
}

// Export the firestore module
export default firebaseApp;