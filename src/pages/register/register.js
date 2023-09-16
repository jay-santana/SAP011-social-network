import { createUser } from "../../firebase-auth.js"

export default () => {
  const container = document.createElement('div');

  const template = `
  <body>
  <main id='register-page'>
  <section id='register-container'>
    <h1>DIÁRIO DE VIAGEM</h1>
    <h2>Bem-vindo(a)!</h2>
    <h3>Preencha os dados para cadastrar</h3> 
    <form>
      <input id="createUserName" type="text" placeholder="Nome de usuário">
      <p id="createUserNameAlert"></p>
      <input id="createEmail" type="email" placeholder="E-mail">
      <p id="createEmailAlert"></p>
      <input id="createPassword" type="password" placeholder="Senha">
      <p id="createPasswordAlert"></p> 
      <input id="confirmPassword" type="password" placeholder="Confirmar senha">
      <p id="confirmPasswordAlert"></p> 
      <button id="registerButton"><a href="/#feed">Cadastrar</a></button>
    </form>
    <section> 
      <p>Já tem uma conta? <button id="loginBtn"><a href="/#login">Faça login</a></button></p>
    </section> 
      <h4>Desenvolvido por Jayanny<a href="https://github.com/jay-santana"></a> e Sarah<a href="https://github.com/laosarah"></a></h4>
  </section>
  </main>  
</body>
  `;
  container.innerHTML = template;

const createUserName = container.querySelector('#createUserName');
const createEmail = container.querySelector('#createEmail');
const createPassword = container.querySelector('#createPassword');
const confirmPassword = container.querySelector('#confirmPassword');
const registerButton = container.querySelector('#registerButton');

registerButton.addEventListener('click', function(event) {
  event.preventDefault();
  if(createUserName.value === '') {
    container.querySelector('#createUserNameAlert').innerHTML = 'Nome de usuário obrigatório'
  } 
  if(createEmail.value === '') {
    container.querySelector('#createEmailAlert').innerHTML = 'E-mail obrigatório'
  }
  if(createPassword.value === '') {
    container.querySelector('#createPasswordAlert').innerHTML = 'Senha obrigatório'
  }
  if(confirmPassword.value === '') {
    container.querySelector('#confirmPasswordAlert').innerHTML = 'Confirmar senha obrigatório'
  } 
  if(createPassword.value !== confirmPassword.value) {
    container.querySelector('#confirmPasswordAlert').innerHTML = 'Senhas precisam ser iguais!'
  } else {
    createUser(createUserName.value, createEmail.value, createPassword.value, confirmPassword.value)
    .then(() => {
      window.location.hash = '#feed';
      // const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;

        // Se o erro estiver relacionado ao email já cadastrado, exibe a mensagem de erro no elemento HTML correspondente
        if (errorCode === 'auth/email-already-in-use') {
          container.querySelector('#createEmailAlert').textContent = 'E-mail já cadastrado!'
        }
        if (errorCode === 'auth/invalid-email') {
          container.querySelector('#createEmailAlert').textContent = 'E-mail inválido!'
        }

      // container.querySelector('#createEmailAlert').innerHTML = 'E-mail já cadastrado!'
      // alert("Email já cadastrado")
    });
  }
});
return container;
};
