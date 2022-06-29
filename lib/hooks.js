import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth} from '../lib/firebase'
import { doc, onSnapshot, getFirestore} from 'firebase/firestore';

export function useUserData(){
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)


  
    useEffect(() => {
      // turn of real time subscription
      let unsubscribe;
      
      if(user){
        const ref = doc(getFirestore(), 'users', user.uid);
        
        unsubscribe = onSnapshot(ref, (snapshot) => {
            setUsername(snapshot.data()?.username)
        })
      } else{
        setUsername(null)
      }
      return unsubscribe;
    }, [user])

    return {user, username}
}