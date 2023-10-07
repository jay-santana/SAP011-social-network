import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  // onAuthStateChanged,
} from 'firebase/auth';
import {
  createUser,
  signIn,
  loginGoogle,
  signOutUser,
  accessUser,
  // verifyUserLogged,
} from '../src/firebase-auth.js';
import { auth } from '../src/firebase-conf.js';

// // Informando para o jest a biblioteca
jest.mock('firebase/auth');
jest.mock('../src/firebase-conf.js', () => ({
  ...jest.requireActual('../src/firebase-conf.js'),
  auth: {
    currentUser: {
      displayName: 'TestUser',
      email: 'test@example.com',
      uid: '12345',
    },
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

// Teste Login de Usuário
describe('signIn', () => {
  it('is a function', () => {
    expect(typeof signIn).toBe('function');
  });

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
      auth,
      user.email,
      user.password,
    );
  });
});

// Teste Login de Usuário com Google
describe('loginGoogle', () => {
  it('is a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('É esperado que o usuário consiga logar com uma conta google', () => {
    const mockProvider = new GoogleAuthProvider();
    signInWithPopup.mockResolvedValue(mockProvider);
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

// Teste Botão Logout
describe('signOutUser', () => {
  it('is a function', () => {
    expect(typeof signOutUser).toBe('function');
  });

  it('É esperado que o usuário consiga deslogar', () => {
    const mockLogout = {
      user: {
        displayName: 'TestUser',
      },
    };
    signOut.mockResolvedValue(mockLogout);
    signOutUser();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

// Teste Acesso informação do usuário
describe('accessUser', () => {
  it('is a function', () => {
    expect(typeof accessUser).toBe('function');
  });

  it('É esperado que o usuário esteja logado', () => {
    auth.currentUser = {
      displayName: 'TestUser',
      email: 'test@example.com',
      uid: '12345',
    };
    const user = accessUser();
    expect(user).toEqual({
      displayName: 'TestUser',
      email: 'test@example.com',
      uid: '12345',
    });
  });

  it('É esperado que o usuário não esteja logado', () => {
    auth.currentUser = null;
    const user = accessUser();
    expect(user).toBeNull();
  });
});

// describe('accessUser', () => {
//   it('is a function', () => {
//     expect(typeof accessUser).toBe('function');
//   });

//   it('É esperado que o usuário esteja logado', () => {
//     const user = createUserForm[0];

//     accessUser(
//       undefined,
//     );
//     expect(user).toEqual(
//       auth,
//     );
//   });

//   it('É esperado que o usuário não esteja logado', () => {
//     const user = createUserForm[0];
//     accessUser(
//       null,
//     );
//     expect(user).toBeNull();
//   });
// });

// Teste Verificar se usuário esta logado
// describe('verifyUserLogged', () => {
//   it('is a function', () => {
//     expect(typeof verifyUserLogged).toBe('function');
//   });

//   it('É esperado que o usuário permaneça logado', () => {
//     const mockCallback = jest.fn();
//     onAuthStateChanged.mockImplementation((callback) => {
//       const user = {
//         displayName: 'TestUser',
//         email: 'test@example.com',
//       };
//       callback(user);
//     });
//     verifyUserLogged(mockCallback);
//     expect(mockCallback).toHaveBeenCalledTimes(1);
//   });
// });
