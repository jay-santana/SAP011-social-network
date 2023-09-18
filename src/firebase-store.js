import { dataBase } from './firebaseConfig';

import { collection, addDoc } from 'firebase/firestore';

export const creatPost(createUserName, userID, content) => {
    creatPost.addDoc(collection(dataBase, 'posts'), {
        content: content,
        createUserName: createUserName,
        userID: userID,
    }); 
}