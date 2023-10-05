import { signIn, loginGoogle } from '../../firebase-auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <body>
    <main id="login-page">
      <h3 id=textApp>Registre sensações, compartilhe 
      experiências e eterniza momentos 
      das suas viagens com a gente!</h3>
      <div id="login-container-style">
        <section id="login-container">
          <h1>DIÁRIO DE VIAGEM</h1>
          <h3>Registre sensações, compartilhe 
          experiências e eterniza momentos 
          das suas viagens com a gente!</h3>
          <span id="welcomeText"> 
            <h2>Bem-vindo(a)!</h2>
            <h3>faça login para continuar</h3>
          </span>
          <form>
            <input id="loginEmail" type="email" placeholder="E-mail">
            <p id="loginEmailAlert"></p>
            <input id="loginPassword" type="password" placeholder="Senha">
            <p id="loginPasswordAlert"></p> 
            <button id="loginButton"><a class="loginButtonOne" href="/#login">Login</a></button>
          </form>
          <p>---------- ou ----------</p>
          <p>Fazer login com o Google</p>
          <section> 
            <img id="googleIcon"src="../../assets-2/google_icon.png" alt="ícone Goggle">
          </section> 
          <section> 
            <p>Não tem uma conta? <button id="loginBtn"><a class="loginButtonTwo" href="/#cadastro">Cadastre-se</a></button></p>
          </section> 
        </section>
        <section id="footerContainerLogin">
          <h4 id="footerInformation">Desenvolvido por <span id="loginDevOne">Jayanny<a href="https://github.com/jay-santana"></span></a> e <span id="loginDevTwo">Sarah<a href="https://github.com/laosarah"></span></a></h4>
        </section>
      </div>
    </main> 
  </body>
  `;
  container.innerHTML = template;

  const loginEmail = container.querySelector('#loginEmail');
  const loginPassword = container.querySelector('#loginPassword');
  const loginButton = container.querySelector('#loginButton');
  const googleIconBtn = container.querySelector('#googleIcon');

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (loginEmail.value === '') {
      container.querySelector('#loginEmailAlert').innerHTML = 'E-mail obrigatório';
    }
    if (loginPassword.value === '') {
      container.querySelector('#loginPasswordAlert').innerHTML = 'Senha obrigatória';
    } else {
      signIn(loginEmail.value, loginPassword.value)
        .then((userCredential) => {
          window.location.hash = '#feed';
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorCode === 'auth/user-not-found') {
            container.querySelector('#loginEmailAlert').textContent = 'E-mail não cadastrado!';
          }
          if (errorCode === 'auth/email-already-in-use') {
            container.querySelector('#loginEmailAlert').textContent = 'E-mail já cadastrado!';
          }
          if (errorCode === 'auth/wrong-password') {
            container.querySelector('#loginEmailAlert').textContent = 'Senha incorreta!';
          }
        });
    }
  });
  googleIconBtn.addEventListener('click', (event) => {
    event.preventDefault();
    loginGoogle()
      .then((result) => {
        // The signed-in user info.
        window.location.hash = '#feed';
        const user = result.user;
        console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email);
      });
  });
  return container;
};
