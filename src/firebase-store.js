import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebase-conf';

const posts = 'posts';

// Adicionar dados
// export function publication() {
//   const user = accessUser();
//   const data = {
//     dataBox: Timestamp.now(), // Use serverTimestamp para obter a data e hora atual do servidor
//     locationInput: locationInput.value,
//     textBox: textBox.value,
//     user: user.uid,
//     displayName: user.displayName,
//     likes: [],
//   };
//   addDoc(collection(db, posts), data)
//     .then((docRef) => {
//       console.log('Documento adicionado com sucesso:', docRef.id);
//     })
//     .catch((error) => {
//       console.error('Erro ao adicionar documento:', error);
//     });
// }

// Editar dados
export function editPoster(postIdSave, textBoxEditValue, locationInputEditValue, updatPoster) {
  updateDoc(doc(db, posts, postIdSave), {
    textBox: textBoxEditValue,
    locationInput: locationInputEditValue,
  }).then(
    updatPoster(textBoxEditValue, locationInputEditValue)
  );
}

// Excluir dados
export function deletePoster(postIdDelete) {
  deleteDoc(doc(db, posts, postIdDelete));
}

// Carregando o poster no feed
export function loadPoster(
  addPoster,
  limparTela,
  attachLikeOnPosts, 
  attachEditOnPosts,
  attachDeleteOnPosts, 
) { 
  console.log('loadPoster')
  limparTela();
  const posterCollection = collection(db, posts);
  const orderPoster = query(posterCollection, orderBy('dataBox', 'desc'));
  getDocs(orderPoster).then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      const postData = item.data();
      postData.postId = item.id;
      addPoster(postData);
      attachLikeOnPosts();
      attachEditOnPosts();
      attachDeleteOnPosts();
    });
  }).catch((error) => {
    console.error('Erro ao carregar postagens ordenadas:', error);
  });
}

 