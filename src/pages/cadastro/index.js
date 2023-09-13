import { createUser } from "../../firebase-auth.js"

export default () => {
  const container = document.createElement('div');

  const template = `
  <body>
  <main>
  <section id='feed-container'>
    <h1>DIÁRIO DE VIAGEM</h1>
    <h2>Bem-vindo(a)!</h2>
    <h3>Preencha os dados para cadastrar</h3> 
    <form>
      <input id="userCreate" type="text" placeholder="Nome de usuário">
      <p id="createUserAlert"></p>
      <input id="createEmail" type="text" placeholder="E-mail">
      <p id="createEmailAlert"></p>
      <input id="createPassword" type="password" placeholder="Senha">
      <p id="createPasswordAlert"></p> 
      <input id="passwordConfirm" type="password" placeholder="Confirmar senha">
      <p id="confirmPasswordAlert"></p> 
      <button id="buttonCreate"><a href="/#feed">Cadastrar</a></button>
    </form>
    <section> 
      <p>Já tem uma conta? <button id="btnLogin"><a href="/#login">Faça login</a></button></p>
    </section> 
      <h4>Desenvolvido por Jayanny<a href="https://github.com/jay-santana"></a> e Sarah<a href="https://github.com/laosarah"></a></h4>
  </section>
  </main>  
</body>
  `;
  container.innerHTML = template;

const userCreate = document.querySelector('#userCreate');
const createEmail = document.querySelector('#createEmail');
const createPassword = document.querySelector('#createPassword');
const passwordConfirm = document.querySelector('#passwordConfirm');
const buttonCreate = document.querySelector('#buttonCreate');

buttonCreate.addEventListener('click', function(event) {
  event.preventDefault();
  if(userCreate.value === '') {
    container.querySelector('#createUserAlert').innerHTML = 'Nome de usuário obrigatório'
  } 
  if(createEmail.value === '') {
    container.querySelector('#createEmailAlert').innerHTML = 'E-mail obrigatório'
  }
  if(createPassword.value === '') {
    container.querySelector('#createPasswordAlert').innerHTML = 'Senha obrigatório'
  }
  if(passwordConfirm.value === '') {
    container.querySelector('#confirmPasswordAlert').innerHTML = 'Confirmar senha obrigatório'
  } else {
    createUser(userCreate.value, createEmail.value, createPassword.value)
    .then((userCredential) => {
      window.location.hash = '#feed';
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
})
  return container;
};
