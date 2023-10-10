import { createUser } from '../../firebase-auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <body>
    <main id="register-page">
      <div id="container-register-style"> 
        <section id="register-container">
          <section id="inform-register">
            <h1 id="nameApp">DIÁRIO DE VIAGEM</h1>
            <section id="welcome">  
              <h2>Bem-vindo(a)!</h2>
              <h3>Preencha os dados para cadastrar</h3>
            </section>
            <form>
              <input id="createUserName" type="text" placeholder="Nome de usuário">
              <p id="createUserNameAlert"></p>
              <input id="createEmail" type="email" placeholder="E-mail">
              <p id="createEmailAlert"></p>
              <input id="createPassword" type="password" placeholder="Senha">
              <p id="createPasswordAlert"></p> 
              <input id="confirmPassword" type="password" placeholder="Confirmar senha">
              <p id="confirmPasswordAlert"></p> 
              <button id="registerButton"><a class="registerButtonOne" href="/#feed">Cadastrar</a></button>
            </form>
          </section>
          <section>
            <p id="gotologin">Já tem uma conta? <button id="registerBtn"><a class="registerButtonTwo" href="/#login">Faça login</a></button></p>
          </section>
        </section>
        <section id="footerContainerRegister">
          <h4 id="footerInformation"> Desenvolvido por <span id="registerDevOne"> Jayanny <a href="https://github.com/jay-santana"></span></a> e <span id="registerDevTwo"> Sarah <a href="https://github.com/laosarah"></span></a></h4>
        </section>
      </div> 
    </main>
  </body>
  `;
  container.innerHTML = template;

  const createUserName = container.querySelector('#createUserName');
  const createEmail = container.querySelector('#createEmail');
  const createPassword = container.querySelector('#createPassword');
  const confirmPassword = container.querySelector('#confirmPassword');
  const registerButton = container.querySelector('#registerButton');

  registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (createUserName.value === '') {
      container.querySelector('#createUserNameAlert').innerHTML = 'Nome de usuário obrigatório';
    }
    if (createEmail.value === '') {
      container.querySelector('#createEmailAlert').innerHTML = 'E-mail obrigatório';
    }
    if (createPassword.value === '') {
      container.querySelector('#createPasswordAlert').innerHTML = 'Senha obrigatório';
    }
    if (confirmPassword.value === '') {
      container.querySelector('#confirmPasswordAlert').innerHTML = 'Confirmar senha obrigatório';
    }
    if (createPassword.value !== confirmPassword.value) {
      container.querySelector('#confirmPasswordAlert').innerHTML = 'Senhas precisam ser iguais!';
    } else {
      createUser(
        createUserName.value,
        createEmail.value,
        createPassword.value,
        confirmPassword.value,
      )
        .then(() => {
          window.location.hash = '#feed';
          // const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          // Se erro de email já cadastrado, exibe a mensagem de erro
          if (errorCode === 'auth/email-already-in-use') {
            container.querySelector('#createEmailAlert').textContent = 'E-mail já cadastrado!';
          }
          if (errorCode === 'auth/invalid-email') {
            container.querySelector('#createEmailAlert').textContent = 'E-mail inválido!';
          }

          // container.querySelector('#createEmailAlert').innerHTML = 'E-mail já cadastrado!'
          // alert("Email já cadastrado")
        });
    }
  });

  return container;
};
