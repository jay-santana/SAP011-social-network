// import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from './firebase-conf.js';

// Criação de novos usuários
export function createUser(createUserName, createEmail, createPassword, confirmPassword) {
  return createUserWithEmailAndPassword(auth, createEmail, createPassword, confirmPassword)
    .then(async () => {
      await updateProfile(auth.currentUser, {
        displayName: createUserName,
      })
        .then(() => {
          const eventCreate = new CustomEvent('userCreated', { detail: createUserName });
          window.dispatchEvent(eventCreate);
          const eventNamePublication = new CustomEvent('userPublication', { detail: createUserName });
          window.dispatchEvent(eventNamePublication);
        });
    });
}
// Login com o Google
export function loginGoogle(user) {
  const provider = new GoogleAuthProvider();
  if (user) {
    window.location.hash = '#feed';
  } else {
    window.location.hash = '#login';
  }
  return signInWithPopup(auth, provider);
}
// Verificar se usuário está logado
export function verifyUserLogged(callback) {
  onAuthStateChanged(auth, callback);
}
// Acessar informação do usuários
export function accessUser() {
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const uid = user.uid;
    console.log(displayName, email, uid);
    return user;
  }
  return accessUser();
}
// Login de usuários existentes
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
      console.log(errorCode, errorMessage);
    });
  return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
}
// Para desconectar um usuário
export function signOutBtn() {
  return signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
    console.log(error);
  // An error happened.
  });
}
