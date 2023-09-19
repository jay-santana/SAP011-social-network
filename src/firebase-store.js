import { db } from './firebase-conf';

import { collection, addDoc } from 'firebase/firestore';


//Adicionar dados
export function publication(data) {
  addDoc(collection(db, 'Diário de Viagem'), data)
    .then((docRef) => {
      console.log('Documento adicionado com sucesso:', docRef.id);
    })
    .catch((error) => {
      console.error('Erro ao adicionar documento:', error);
    });
}

//Ler dados
//Atualizar um dado
//Excluir dados
