import { db } from './firebase-conf';
import { collection, addDoc, updateDoc } from 'firebase/firestore';

const posts = "posts";

// Adicionar dados
export function publication(data) {
  addDoc(collection(db, posts), data)
    .then((docRef) => {
      console.log('Documento adicionado com sucesso:', docRef.id);
    })
    .catch((error) => {
      console.error('Erro ao adicionar documento:', error);
    });
}

// Editar dados
export function editPoster(postId, textBoxEdit) {
  updateDoc(doc(db, posts, postId), {
    textBox: textBoxEdit,
  });
};

//Excluir dados
export function deletePoster(posterCollection) {
  deleteDoc(doc(db, posts, posterCollection));
}

