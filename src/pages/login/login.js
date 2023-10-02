import { signIn } from "../../firebase-auth.js"

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
            <button id="loginButton"><a href="/#login">Login</a></button>
          </form>
          <p>-------------------- ou --------------------</p>
          <p>Fazer login com o Google</p>
          <section> 
            <img id="googleIcon"src="../../assets-2/google_icon.png" alt="ícone Goggle">
          </section> 
          <section> 
            <p>Não tem uma conta? <button id="registerBtn"><a href="/#cadastro">Cadastre-se</a></button></p>
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

  loginButton.addEventListener('click', function(event) {
    event.preventDefault();
    if(loginEmail.value === '') {
      container.querySelector('#loginEmailAlert').innerHTML = 'E-mail obrigatório'
    } 
    if(loginPassword.value === '') {
      container.querySelector('#loginPasswordAlert').innerHTML = 'Senha obrigatória'
    } else {
    signIn(loginEmail.value, loginPassword.value)
    .then((userCredential) => { 
      window.location.hash = "#feed";
      const user = userCredential.user;
    }) 
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
     
      if (errorCode === 'auth/user-not-found') {
        container.querySelector('#loginEmailAlert').textContent = 'E-mail não cadastrado!'
      }
      if (errorCode === 'auth/email-already-in-use') {
        container.querySelector('#loginEmailAlert').textContent = 'E-mail já cadastrado!'
      }
      if (errorCode === 'auth/wrong-password') {
        container.querySelector('#loginEmailAlert').textContent = 'Senha incorreta!'
      }
    });
    } 
  });
  return container;
};
  
     //Import function signIn
     //Executar a função 
     //Repassar e-mail e senha (firebase)

  // container.querySelector(#idDoInput); exemplo de como vai ficar mais ou menos
  // manipulação de dom 
  // click de botão  
