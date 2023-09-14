// import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from './firebase-conf.js';

//Criação de novos usuários
export function createUser(createUsername, createEmail, createPassword, confirmPassword) {
    return createUserWithEmailAndPassword(auth, createEmail, createPassword, confirmPassword).then(() => {
      updateProfile(auth.currentUser, {
        displayName: createUsername,
      });
    })
}

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