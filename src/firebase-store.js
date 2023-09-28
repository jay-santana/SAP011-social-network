import { db } from './firebase-conf';
import { collection, addDoc } from 'firebase/firestore';

// Adicionar dados
export function publication(data) {
  addDoc(collection(db, 'Diário de Viagem'), data)
    .then((docRef) => {
      console.log('Documento adicionado com sucesso:', docRef.id);
    })
    .catch((error) => {
      console.error('Erro ao adicionar documento:', error);
    });
}

// Edita dados
export function editPoster(posterCollection, newtextBox) {
  updateDoc(doc(db, "Diário de Viagem", posterCollection), {
    textBox: newtextBox,
  });
}


//Ler dados
//Atualizar um dado
//Excluir dados
