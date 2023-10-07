import {
  createUserWithEmailAndPassword,
  //   signInWithPopup,
  //   signInWithEmailAndPassword,
  //   onAuthStateChanged,
  //   signOut,
} from 'firebase/auth';
import {
  createUser,
//   loginGoogle,
//   signIn,
//   verifyUserLogged,
//   signOutBtn,
} from '../src/firebase-auth.js';
import { auth } from '../src/firebase-conf.js';

// // Informando para o jest a biblioteca
jest.mock('firebase/auth');
jest.mock('../src/firebase-conf.js', () => ({
  ...jest.requireActual('../src/firebase-conf.js'),
  auth: {
    currentUser: 'user',
  },
}));

// jest.mock('firebase/firestore');

const createUserForm = [
  {
    name: 'Maria',
    email: 'maria@email.com',
    password: '123456',
    confirmPassword: '123456',
  },
];
// const loginUserGoogle = [
//   {
//     email: 'maria@gmail.com',
//     password: '654321',
//   },
// ];

// Teste Cadastro de Usuário
describe('createUser', () => {
  it('is a function', () => {
    expect(typeof createUser).toBe('function');
  });

  it('Esperado que o input do nome receba um nome valido', async () => {
    createUserWithEmailAndPassword.mockResolvedValue();

    const user = createUserForm[0];

    await createUser(
      undefined,
      user.email,
      user.password,
      user.confirmPassword,
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      user.email,
      user.password,
      user.confirmPassword,
    );
  });
});

// it('Esperado que o input do nome receba um nome valido', () => {
//   createUserWithEmailAndPassword.mockResolvedValue();
//   expect(createUser(createUserForm, 'name')).toStrictEqual([{
//     name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//   }]);
// });

// it('É esperado que o input do email receba um email valido', () => {
//   expect(createUser(createUserForm, 'email')).toStrictEqual([{
//     name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//   }]);
// });
// it('É esperado que o input de senha receba uma senha valida', () => {
//   expect(createUser(createUserForm, 'password')).toStrictEqual([{
//     name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//   }]);
// });
// it('É esperado que o input de confirmação de senha', () => {
//   expect(createUser(createUserForm, 'confirmPassword')).toStrictEqual([{
//     name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//   }]);
// });
// });

// Teste Login de Usuário
// describe('signIn', () => {
//   it('is a function', () => {
//     expect(typeof signIn).toBe('function');
//   });

//   it('Esperado que o usuário cadastrado consiga logar com mesmo email cadastrado', () => {
//     signInWithEmailAndPassword.mockResolvedValue(userCredential);
//     expect(signIn(createUserForm, 'maria@email.com')).toStrictEqual([{
//       name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//     }]);
//   });

//   it('É esperado que o usuário cadastrado consiga logar com a mesma senha cadastrada', () => {
//     expect(signIn(createUserForm, '123456')).toStrictEqual([{
//       name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//     }]);
//   });
// });

// // Teste Login de Usuário com Google
// describe('loginGoogle', () => {
//   it('is a function', () => {
//     expect(typeof loginGoogle).toBe('function');
//   });
//   it('É esperado que o usuário consiga logar com uma conta google', () => {
//     expect(loginGoogle(loginUserGoogle, 'maria@gmail.com')).toStrictEqual([{
//       name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
//     }]);
//   });
// });
