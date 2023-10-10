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
  getDoc,
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
  likePoster,
} from '../src/firebase-store.js';

// Informando para o jest a biblioteca
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'test' },
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
// jest.mock('firebase/firestore');

jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(() => ({
    data: () => ({ likes: [] }), // Estrutura de dados esperada
  })),
  getFirestore: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

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
  it('Esperado que os inputs recebam valores valido', async () => {
    createUserWithEmailAndPassword.mockResolvedValue();

    const user = createUserForm[0];

    await createUser(
      user.name,
      user.email,
      user.password,
      user.confirmPassword,
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      { currentUser: { uid: 'test' } },
      user.email,
      user.password,
      user.confirmPassword,
    );
  });
});

// Teste Login de Usuário
describe('signIn', () => {
  it('Esperado que o usuário consiga logar com os dados cadastrados', async () => {
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
      { currentUser: { uid: 'test' } },
      user.email,
      user.password,
    );
  });
});

// Teste Login de Usuário com Google
describe('loginGoogle', () => {
  it('Esperado que o usuário consiga logar com uma conta google', () => {
    const mockProvider = new GoogleAuthProvider();
    signInWithPopup.mockResolvedValue();
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledWith({ currentUser: { uid: 'test' } }, mockProvider);
  });
});

// Teste Botão Logout
describe('signOutUser', () => {
  it('Esperado que o usuário consiga deslogar', () => {
    const mockLogout = {
      user: {
        displayName: 'TestUser',
      },
    };
    signOut.mockResolvedValue(mockLogout);
    signOutUser();
    expect(signOut).toHaveBeenCalledWith({ currentUser: { uid: 'test' } });
  });
});

// Teste Acesso informação do usuário (Naroka)
describe('accessUser', () => {
  it('Esperado que o usuário não esteja logado', () => {
    const user = accessUser();
    expect(user).toStrictEqual({ uid: 'test' });
  });
});

// Teste Verificar se usuário esta logado
describe('verifyUserLogged', () => {
  it('Esperado que o usuário permaneça logado', () => {
    const mockCallback = jest.fn();
    verifyUserLogged(mockCallback);
    expect(onAuthStateChanged).toHaveBeenCalledWith({ currentUser: { uid: 'test' } }, mockCallback);
  });
});

// Teste função deletar
describe('deletePoster', () => {
  it('Deve chamar deleteDoc com o ID correto e updateDelete', async () => {
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
  it('Deve chamar editPoster com o ID correto e updatePoster', async () => {
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

// Teste função like (2)
describe('likePoster', () => {
  const postIdLike = 'post123';
  const updateLike = jest.fn();
  it('Deve chamar likePoster com o ID correto e adicionar um like', async () => {
    updateDoc.mockClear();
    await likePoster(postIdLike, updateLike);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postIdLike);
    expect(updateDoc).toHaveBeenCalledWith(
      undefined,
      { likes: ['test'] },
    );
    expect(updateLike).toHaveBeenCalledWith(postIdLike, 1);
  });

  it('Deve chamar likePoster com o ID correto e remover um like', async () => {
    updateDoc.mockClear();
    getDoc.mockImplementation(jest.fn(() => ({
      data: () => ({ likes: ['test'] }),
    })));
    await likePoster(postIdLike, updateLike);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postIdLike);
    expect(updateDoc).toHaveBeenCalledWith(
      undefined,
      { likes: [] },
    );
    expect(updateLike).toHaveBeenCalledWith(postIdLike, 0);
  });
});
