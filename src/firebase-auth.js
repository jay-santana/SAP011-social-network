// import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from './firebase-conf.js';

//Criação de novos usuários
export function createUser(createUserName, createEmail, createPassword, confirmPassword) {
    return createUserWithEmailAndPassword(auth, createEmail, createPassword, confirmPassword).then(() => {
      updateProfile(auth.currentUser, {
        displayName: createUserName,
      }).then(() => {
        const eventCreate = new CustomEvent('userCreated', { detail: createUserName });
        window.dispatchEvent(eventCreate);
    });
      });
}

//Login de usuários existentes
export function signIn(loginEmail, loginPassword) {
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const createUserName = user.displayName;
      const eventSignIn = new CustomEvent('userLoggedIn', { detail: createUserName });
      window.dispatchEvent(eventSignIn);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
}

//Para desconectar um usuário
// const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });