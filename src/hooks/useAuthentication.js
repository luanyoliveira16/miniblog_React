import { db } from '../firebase/config'

import { 
          getAuth,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          updateProfile,
          signOut
} from 'firebase/auth';

import {useState, useEffect} from 'react';

export const useAuthentication = () => {
          const [error, setError] = useState(null)
          const [loading, setLoading] = useState(null)

          // cleanup
          // deal with memory leak

          const [cancelled, setCancelled] = useState(false) //false pq n está cancelado, só será depois que as coisas derem certo
       
          const auth = getAuth()

          function checkIfIsCancelled() {
                    if(cancelled) {
                              return;
                    }
          }

          const createUser = async(data) => { 
                    checkIfIsCancelled()  //checar se está cancelado, caso nao esteja
                    
                    setLoading(true) //da um loading como true
                    setError(null);

                    try{
                     
                        const {user} = await createUserWithEmailAndPassword (
                        auth,
                        data.email,
                        data.password
                        )
                        
                        // firebase
                        await updateProfile(user, {displayName: data.displayName})
                        return user

                    } catch (error) {
                      
                      let systemErrorMessage 

                      if(error.message.includes("Password")){
                              systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
                      } else if(error.message.includes("email-already")) {
                              systemErrorMessage = "E-mail já cadastrado."
                      } else{
                              systemErrorMessage = "Ocorre um erro. Tente mais tarde!"
                      }
                      setError(systemErrorMessage)

                        console.error(error.message) 
                        console.error(typeof error.message)
                    }

                    setLoading(false) //acabou a funçao
          }

         useEffect(() =>{
          return () => setCancelled(true)
         })




          return{
                    auth,
                    createUser,
                    error,
                    loading
          }

}

   