// import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";

import { auth } from './firebase-conf.js';

//Criação de novos usuários
export function createUser(createUserName, createEmail, createPassword, confirmPassword) {
    return createUserWithEmailAndPassword(auth, createEmail, createPassword, confirmPassword).then(() => {
      updateProfile(auth.currentUser, {
        displayName: createUserName,
      }).then(() => {
        const eventCreate = new CustomEvent('userCreated', { detail: createUserName });
        window.dispatchEvent(eventCreate);
        const eventNamePublication = new CustomEvent('userPublication', { detail: createUserName });
        window.dispatchEvent(eventNamePublication);
      });
    });
}

export function verifyUserLogin(callback ) {
  onAuthStateChanged(auth, callback);
}

//Acessar informação do usuários 
export function accessUser() {
  const user = auth.currentUser;
  if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    return user;
    const uid = user.uid;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
  } 
} 

// const editPost = doc(db, "Diário de Viagem");
// await updateDoc(editPost, {
//   dataBox: true,
//   textBox: true,
//   locationInput: true,
// });

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

// const auth = getAuth();
//Para desconectar um usuário
export function signOutBtn() {
  return signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
}