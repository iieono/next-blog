import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { query, where, limit } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdlQizA7WYeSRr7SZ4PFvMJMD7QSDc5sk",
    authDomain: "fireblog-app-f295c.firebaseapp.com",
    projectId: "fireblog-app-f295c",
    storageBucket: "fireblog-app-f295c.appspot.com",
    messagingSenderId: "349550907150",
    appId: "1:349550907150:web:8531b6ca73a59991a5915f"
};
  

function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
  }

const firebaseApp = createFirebaseApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();



export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed'; 


export async function getUserWithUsername(username) {
    // const usersRef = collection(firestore, 'users');
    // const query = usersRef.where('username', '==', username).limit(1);
  
    const q = query(
      collection(firestore, 'users'),
      where('username', '==', username),
      limit(1)
    )
    const userDoc = ( await getDocs(q) ).docs[0];
    return userDoc;
  }

  /**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  }