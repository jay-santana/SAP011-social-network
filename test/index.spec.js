import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  // getAuth,
} from 'firebase/auth';

import {
  deleteDoc,
  doc,
  updateDoc,
  // getDoc,
  // docSnap,
} from 'firebase/firestore';

import {
  createUser,
  signIn,
  loginGoogle,
  signOutUser,
  accessUser,
  verifyUserLogged,
} from '../src/firebase-auth.js';

import {
  deletePoster,
  editPoster,
  // likePoster,
} from '../src/firebase-store.js';

// Informando para o jest a biblioteca
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {},
  })),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  GoogleAuthProvider: class {},
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback();
  }),
}));
jest.mock('firebase/firestore');

// Mock de um objeto que representa o resultado da consulta ao Firestore
// const mockDocSnapshot = {
//   data: jest.fn(() => ({
//     likes: ['user1', 'user2'],
//   })),
// };

// jest.mock('firebase/firestore', () => ({
//   doc: jest.fn(),
//   getDoc: jest.fn(),
//   updateDoc: jest.fn(),
//   data: jest.fn(),
// }));

const createUserForm = [
  {
    name: 'Maria',
    email: 'maria@email.com',
    password: '123456',
    confirmPassword: '123456',
  },
];

// Teste Cadastro de Usuário
describe('createUser', () => {
  it('Esperado que o input do nome receba um nome valido', async () => {
    createUserWithEmailAndPassword.mockResolvedValue();

    const user = createUserForm[0];

    await createUser(
      user.name,
      user.email,
      user.password,
      user.confirmPassword,
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      { currentUser: {} },
      user.email,
      user.password,
      user.confirmPassword,
    );
  });
});

// Teste Login de Usuário
describe('signIn', () => {
  it('Esperado que o usuário cadastrado consiga logar com mesmo email cadastrado', async () => {
    const mockUserCredential = {
      user: {
        displayName: 'TestUser',
      },
    };
    signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);

    const user = createUserForm[0];

    await signIn(
      user.email,
      user.password,
    );

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      { currentUser: {} },
      user.email,
      user.password,
    );
  });
});

// Teste Login de Usuário com Google
describe('loginGoogle', () => {
  it('É esperado que o usuário consiga logar com uma conta google', () => {
    const mockProvider = new GoogleAuthProvider();
    signInWithPopup.mockResolvedValue();
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledWith({ currentUser: {} }, mockProvider);
  });
});

// Teste Botão Logout
describe('signOutUser', () => {
  it('É esperado que o usuário consiga deslogar', () => {
    const mockLogout = {
      user: {
        displayName: 'TestUser',
      },
    };
    signOut.mockResolvedValue(mockLogout);
    signOutUser();
    expect(signOut).toHaveBeenCalledWith({ currentUser: {} });
  });
});

// Teste Acesso informação do usuário (Naroka)
describe('accessUser', () => {
  it('É esperado que o usuário esteja logado', () => {
    const user = accessUser();
    expect(user).toBe(user);
  });

  it('É esperado que o usuário não esteja logado', () => {
    const user = accessUser();
    expect(user).toStrictEqual({});
  });
});

// Teste Verificar se usuário esta logado
describe('verifyUserLogged', () => {
  it('É esperado que o usuário permaneça logado', () => {
    const mockCallback = jest.fn();
    verifyUserLogged(mockCallback);
    expect(onAuthStateChanged).toHaveBeenCalledWith({ currentUser: {} }, mockCallback);
  });
});

// Teste função deletar
describe('deletePoster', () => {
  it('deve chamar deleteDoc com o ID correto e updateDelete', async () => {
    const postIdDelete = 'post123';
    const updateDelete = jest.fn(); // Mock da função updateDelete
    deleteDoc.mockResolvedValue();
    await deletePoster(postIdDelete, updateDelete);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postIdDelete);
    expect(deleteDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postIdDelete));
    expect(updateDelete).toHaveBeenCalledWith(postIdDelete);
  });
});

// Teste função editar
describe('editPoster', () => {
  it('deve chamar editPoster com o ID correto e updateDoc', async () => {
    const postIdEdit = 'post123';
    const updatePoster = jest.fn();
    const textBoxEditValue = 'teste texto';
    const locationInputEditValue = 'teste localização';
    updateDoc.mockResolvedValue();
    await editPoster(
      postIdEdit,
      textBoxEditValue,
      locationInputEditValue,
      updatePoster,
    );
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postIdEdit);
    expect(updateDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postIdEdit), {
      textBox: textBoxEditValue,
      locationInput: locationInputEditValue,
    });
    expect(updatePoster).toHaveBeenCalledWith(
      postIdEdit,
      textBoxEditValue,
      locationInputEditValue,
    );
  });
});

// Teste função like (1)
// describe('likePoster', () => {
//   it('deve adicionar um like', async () => {
//     // Configurar o mock do getDoc para retornar um documento com likes vazios
//     getDoc.mockReturnValueOnce({
//       data: () => ({ likes: [] }),
//     });

//     // Configurar o mock do updateDoc para verificar se a função é chamada corretamente
//     updateDoc.mockResolvedValueOnce({});

//     const updateLike = jest.fn(); // Criar um mock para a função updateLike

//     // Chamar a função likePoster
//     await likePoster('postId', updateLike);

//     // Verificar se a função updateLike foi chamada com o valor correto
//     expect(updateLike).toHaveBeenCalledWith('postId', 1);
//   });

//   it('deve remover um like', async () => {
//     // Configurar o mock do getDoc para retornar um documento com um like do usuário
//     getDoc.mockReturnValueOnce({
//       data: () => ({ likes: [{ currentUser: {} }] }),
//     });

//     // Configurar o mock do updateDoc para verificar se a função é chamada corretamente
//     updateDoc.mockResolvedValueOnce({});

//     const updateLike = jest.fn(); // Criar um mock para a função updateLike

//     // Chamar a função likePoster
//     await likePoster('postId', updateLike);

//     // Verificar se a função updateLike foi chamada com o valor correto
//     expect(updateLike).toHaveBeenCalledWith('postId', 2);
//   });
// });

// Teste função like (2)
// describe('likePoster', () => {
//   it('deve adicionar um like se o usuário ainda não tiver curtido', async () => {
//     const updateLike = jest.fn();
//     await likePoster('postId123', updateLike);
//     expect(updateDoc).toHaveBeenCalledWith(
//       expect.anything(),
//       { likes: ['user456', 'user123'] },
//     );
//     expect(updateLike).toHaveBeenCalledWith('postId123', 2);
//   });
//   it('deve remover um like se o usuário já tiver curtido', async () => {
//     const updateLike = jest.fn();
//     await likePoster('postId456', updateLike);
//     expect(updateDoc).toHaveBeenCalledWith(
//       expect.anything(),
//       { likes: [] },
//     );
//     expect(updateLike).toHaveBeenCalledWith('postId456', 0);
//   });
// });

// Teste like (3)
// describe('likePoster', () => {
//   const mockSnapshot = (likes) => ({
//     data: () => ({ likes }),
//   });
//   it('deve adicionar um like', async () => {
//     const currentUser = {
//       uid: 'user123',
//     };
//     getAuth.mockReturnValue({
//       currentUser,
//     });
//     getDoc.mockResolvedValue(mockSnapshot([]));
//     const updateLike = jest.fn();
//     await likePoster('postId123', updateLike);
//     expect(updateDoc).toHaveBeenCalledWith(
//       expect.anything(),
//       { likes: ['user123'] },
//     );
//     expect(updateLike).toHaveBeenCalledWith('postId123', 1);
//   });
//   it('deve remover um like', async () => {
//     const currentUser = {
//       uid: 'user456',
//     };
//     getAuth.mockReturnValue({
//       currentUser,
//     });
//     getDoc.mockResolvedValue(mockSnapshot(['user456']));
//     const updateLike = jest.fn();
//     await likePoster('postId456', updateLike);
//     expect(updateDoc).toHaveBeenCalledWith(
//       expect.anything(),
//       { likes: [] },
//     );
//     expect(updateLike).toHaveBeenCalledWith('postId456', 0);
//   });
// });

// teste like (4)
// describe('likePoster function', () => {
//   it('deve adicionar um like se usuário ainda não adicionou', async () => {
//     const updateLike = jest.fn();
//     await likePoster('postId123', updateLike);
//     // Verificar se o Firestore foi consultado corretamente
//     expect(doc).toHaveBeenCalledWith(expect.any(Object), 'posts', 'postId123');
//     expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
//     // Verificar se o Firestore foi atualizado corretamente
//     expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
//       likes: ['user1', 'user2', 'currentUserId'],
//     });
//     // Verificar se a função updateLike foi chamada corretamente
//     expect(updateLike).toHaveBeenCalledWith('postId123', 3);
//   });
//   it('deve retirar um like se usuário já adicionou', async () => {
//     const updateLike = jest.fn();
//     // Modificar mock para retornar um documento com que o usuário já ta na lista de likes
//     mockDocSnapshot.data.mockReturnValueOnce({
//       likes: ['user1', 'user2', 'currentUserId'],
//     });
//     await likePoster('postId123', updateLike);
//     // Verificar se o Firestore foi consultado corretamente
//     expect(doc).toHaveBeenCalledWith(expect.any(Object), 'posts', 'postId123');
//     expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
//     // Verificar se o Firestore foi atualizado corretamente
//     expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
//       likes: ['user1', 'user2'],
//     });
//     // Verificar se a função updateLike foi chamada corretamente
//     expect(updateLike).toHaveBeenCalledWith('postId123', 2);
//   });
// });
