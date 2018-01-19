import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Create the firebase all from the config object
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Export the firestore module
export default firebaseApp.firestore()