// importamos la funcion que vamos a testear
// import { default } from '../src/pages/cadastro/index.js';
import { init } from '../src/index.js';

// describe('default', () => {
//   it('is a function', () => {
//     expect(typeof default).toBe('function');
//   });
// });

describe('init', () => {
  it('is a function', () => {
    expect(typeof init).toBe('function');
  });
});


// variavel abrirFechar = exemplos de locais 

// ex1 = localLogin;
// ex2 = localCadastro;
// ex3 = localFeed;
// ex4 = localSobre; 
// ex5 = localDefault

// testando mudança no hash - local 

// teste login: 
// é esperado que quando clique em login seja ex1 

// teste cadastro: 
// é esperado que quando clique em cadastro seja ex2

// teste feed: 
// é esperado que quando clique em feed seja ex3 

// teste sobre: 
// é esperado que quando clique em sobre seja ex4 

// teste default: 
// é esperado que quando clique em ' ' seja ex5 
