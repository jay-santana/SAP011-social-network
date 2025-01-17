import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  getDocs,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from './firebase-conf';

const posts = 'posts';
export const auth = getAuth(app);
export const db = getFirestore(app);

// Função de Like e deslike
export async function likePoster(postIdLike, updateLike) {
  const uid = auth.currentUser.uid;
  const docSnap = await getDoc(doc(db, posts, postIdLike));
  const likes = docSnap.data().likes || [];
  if (likes.includes(uid)) {
    const updatedLikes = likes.filter((o) => o !== uid);
    await updateDoc(doc(db, posts, postIdLike), { likes: updatedLikes });
    updateLike(postIdLike, updatedLikes.length);
  } else {
    likes.push(uid);
    await updateDoc(doc(db, posts, postIdLike), { likes });
    updateLike(postIdLike, likes.length);
  }
}

// Editar dados
export async function editPoster(
  postIdSave,
  textBoxEditValue,
  locationInputEditValue,
  updatePoster,
) {
  updateDoc(doc(db, posts, postIdSave), {
    textBox: textBoxEditValue,
    locationInput: locationInputEditValue,
  }).then(() => {
    updatePoster(postIdSave, textBoxEditValue, locationInputEditValue);
  });
}

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
