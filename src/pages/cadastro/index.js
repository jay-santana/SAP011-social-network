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
      <input id="createUsername" type="text" placeholder="Nome de usuário">
      <p id="createUsernameAlert"></p>
      <input id="createEmail" type="email" placeholder="E-mail">
      <p id="createEmailAlert"></p>
      <input id="createPassword" type="password" placeholder="Senha">
      <p id="createPasswordAlert"></p> 
      <input id="confirmPassword" type="password" placeholder="Confirmar senha">
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

const createUsername = container.querySelector('#createUsername');
const createEmail = container.querySelector('#createEmail');
const createPassword = container.querySelector('#createPassword');
const confirmPassword = container.querySelector('#confirmPassword');
const buttonCreate = container.querySelector('#buttonCreate');

buttonCreate.addEventListener('click', function(event) {
  event.preventDefault();
  if(createUsername.value === '') {
    container.querySelector('#createUsernameAlert').innerHTML = 'Nome de usuário obrigatório'
  } 
  if(createEmail.value === '') {
    container.querySelector('#createEmailAlert').innerHTML = 'E-mail obrigatório'
  }
  if(createPassword.value === '') {
    container.querySelector('#createPasswordAlert').innerHTML = 'Senha obrigatório'
  }
  if(confirmPassword.value === '') {
    container.querySelector('#confirmPasswordAlert').innerHTML = 'Confirmar senha obrigatório'
  } else {
    createUser(createUsername.value, createEmail.value, createPassword.value)
    .then((userCredential) => {
      window.location.hash = '#feed';
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
});
return container;
};
