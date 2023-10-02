import { createUser, signIn, loginGoogle } from '../src/firebase-auth.js';

// Informando para o jest a biblioteca 
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

const createUserForm = [
  {
    name: 'Maria',
    email: 'maria@email.com',
    password: '123456',
    confirmPassword: '123456',
  },
];
const loginUserGoogle = [
  {
    email: 'maria@gmail.com',
    password: '654321',
  },
];
// Teste Cadastro de Usuário 
describe('createUser', () => {
  it('is a function', () => {
    expect(typeof createUser).toBe('function');
  });
  it('É esperado que o input do nome receba um nome valido', () => {
    createUser.mockResolvedValue();
    expect(createUser(createUserForm, 'name')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
  it('É esperado que o input do email receba um email valido', () => {
    expect(createUser(createUserForm, 'email')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
  it('É esperado que o input de senha receba uma senha valida', () => {
    expect(createUser(createUserForm, 'password')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
  it('É esperado que o input de confirmação de senha receba o mesmo valor do input de senha', () => {
    expect(createUser(createUserForm, 'confirmPassword')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
});
// Teste Login de Usuário 
describe('signIn', () => {
  it('is a function', () => {
    expect(typeof signIn).toBe('function');
  });
  it('É esperado que o usuário cadastrado consiga logar com o mesmo email cadastrado', () => {
    expect(signIn(createUserForm, 'maria@email.com')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
  it('É esperado que o usuário cadastrado consiga logar com a mesma senha cadastrada', () => {
    expect(signIn(createUserForm, '123456')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
});
// Teste Login de Usuário com Google
describe('loginGoogle', () => {
  it('is a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('É esperado que o usuário consiga logar com uma conta google', () => {
    expect(loginGoogle(loginUserGoogle, 'maria@gmail.com')).toStrictEqual([{
      name: 'Maria', email: 'maria@email.com', password: '123456', confirmPassword: '123456',
    }]);
  });
  });
