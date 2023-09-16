import { signIn } from "../../firebase-auth.js"

export default () => {
  const container = document.createElement('div');

  const template = `
    <body>
      <main id='login-page'>
      <section id='login-container'>
        <h1>DIÁRIO DE VIAGEM</h1>
        <h3>Registre sensações, compartilhe 
          experiências e eterniza momentos 
          das suas viagens com a gente!</h3> 
        <h2>Bem-vindo(a)!</h2>
        <h3>faça login para continuar</h3> 
        <form>
          <input id="loginEmail" type="email" placeholder="E-mail">
          <p id='loginEmailAlert'></p>
          <input id="loginPassword" type="password" placeholder="Senha">
          <p id='loginPasswordAlert'></p> 
          <button id="loginButton"><a href="/#login">Login</a></button>
        </form> 
        <p>ou</p>
        <p>Fazer login com o Google</p>
        <section> 
          <button id="googleButton"> Entre com sua conta Google</button>
        </section> 
        <section> 
          <p>Não tem uma conta? <button id="registerBtn"><a href="/#cadastro">Cadastre-se</a></button></p>
        </section> 
          <h4>Desenvolvido por Jayanny<a href="https://github.com/jay-santana"></a> e Sarah<a href="https://github.com/laosarah"></a></h4>
      </section>
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

