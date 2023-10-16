// Importe as funções necessárias dos SDKs
import { initializeApp } from 'firebase/app';
// TODO:  Adicionar SDKs para produtos Firebase que você deseja usar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração do Firebase do seu aplicativo da web
const firebaseConfig = {
  apiKey: "AIzaSyDJt7MdWVOTY-RvjekbDU9SJisXGXQTT4k",
  authDomain: "diario-de-viagem-e1e97.firebaseapp.com",
  projectId: "diario-de-viagem-e1e97",
  storageBucket: "diario-de-viagem-e1e97.appspot.com",
  messagingSenderId: "137767330697",
  appId: "1:137767330697:web:922adeb94d38998384f758"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
