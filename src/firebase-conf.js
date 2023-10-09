// Importe as funções necessárias dos SDKs
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// TODO:  Adicionar SDKs para produtos Firebase que você deseja usar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração do Firebase do seu aplicativo da web
const firebaseConfig = {
  apiKey: 'AIzaSyCjFYQm1nXgXC_NFIbjM2qUFWKBl2HzLyE',
  authDomain: 'social-network-c87de.firebaseapp.com',
  projectId: 'social-network-c87de',
  storageBucket: 'social-network-c87de.appspot.com',
  messagingSenderId: '721577973977',
  appId: '1:721577973977:web:4e3d0bacedc068459986c8',
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Firestore
// export const db = getFirestore(app);
