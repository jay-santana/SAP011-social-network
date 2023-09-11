import { getAuth } from "firebase/auth";

firebase.auth().signInWithEmailAndPassword("any@email.com", "123456").then(response => {
    console.log('success', response)
}).catch(error => {
    console.log('error', error)
}); 

const auth = getAuth(app);
