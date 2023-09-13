// import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from './firebase-conf.js';

//Criação de novos usuários
export function createUser(userCreate, createEmail, createPassword) {
  createUserWithEmailAndPassword(auth, createEmail, createPassword)
  // return createUserWithEmailAndPassword(auth, createEmail, createPassword)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: userCreate,
      });
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  return createUserWithEmailAndPassword(auth, createEmail, createPassword); 
}


// export function createUser(userCreate, createEmail, createPassword) {
//   createUserWithEmailAndPassword(auth, createEmail, createPassword)
//       // updateProfile(user, { displayName });
//       updateProfile(auth.currentUser, {
//         displayName: userCreate,
//       })
//     .then(() => {
//       // Signed in 
//       // const user = userCredential.user;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
//     return createUserWithEmailAndPassword(auth, createEmail, createPassword); 
// }

//Login de usuários existentes
export function signIn(emailLogin, passwordLogin) {
  signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  return signInWithEmailAndPassword(auth, emailLogin, passwordLogin);
}

//Para desconectar um usuário
// const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });