// import { getAuth } from "firebase/auth";

// firebase.auth().signInWithEmailAndPassword("any@email.com", "123456").then(response => {
//     console.log('success', response)
// }).catch(error => {
//     console.log('error', error)
// }); 

// const auth = getAuth(app);


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from './firebase-conf.js';

//Criação de novos usuários
export function createUser(user, email, password) {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // return updateProfile(user, { userName });
  });
}

//Login de usuários existentes
export function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
  // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
