import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db, auth } from './firebase-conf';

const posts = 'posts';

// Like
export async function likePoster(postIdLike, updateLike) {
  const uid = auth.currentUser.uid;
  const docRef = doc(db, posts, postIdLike);
  const docSnap = await getDoc(docRef);
  const likes = docSnap.data().likes || [];
  if (likes.includes(uid)) {
    const updatedLikes = likes.filter((o) => o !== uid);
    await updateDoc(docRef, { likes: updatedLikes });
    updateLike(postIdLike, updatedLikes.length);
  } else {
    likes.push(uid);
    await updateDoc(docRef, { likes });
    updateLike(postIdLike, likes.length);
  }
}
//  Testar o postIdLikes e updateLike
//  (testar se eu possa dar like numa publicação e se esse like é atualizado na página)
//  Criar um mock para getDock e passar para ele o que vou querer testar no docSnap
//  Testar o if e else
//  If se o usuário já curtiu o post:
//  remove o ID do usuário da lista de "likes" no documento do post.
//  Else se o usuário ainda não curtiu o post:
//  adiciona o ID do usuário da lista de "likes" no documento do post.

// Editar dados
export async function editPoster(
  postIdSave,
  textBoxEditValue,
  locationInputEditValue,
  updatPoster,
) {
  updateDoc(doc(db, posts, postIdSave), {
    textBox: textBoxEditValue,
    locationInput: locationInputEditValue,
  }).then(() => {
    updatPoster(postIdSave, textBoxEditValue, locationInputEditValue);
  });
}

// Excluir dados
// export function deletePoster(postIdDelete) {
//   deleteDoc(doc(db, posts, postIdDelete));
// }

// Excluir dados (original)
export async function deletePoster(postIdDelete, updateDelete) {
  deleteDoc(doc(db, posts, postIdDelete))
    .then(() => {
      updateDelete(postIdDelete);
    });
}

// Carregando o poster no feed
export async function loadPoster(
  addPoster,
  limparTela,
  attachLikeOnPosts,
  attachEditOnPosts,
  attachDeleteOnPosts,
) {
  limparTela();
  const posterCollection = collection(db, posts);
  const orderPoster = query(posterCollection, orderBy('dataBox', 'desc'));
  getDocs(orderPoster)
    .then((querySnapshot) => {
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
