import { signIn } from "../../firebase-auth.js"

export default () => {
  const container = document.createElement('div');

  const template = `
    <body>
      <main>
      <section id='feed-container'>
        <h1>DIÁRIO DE VIAGEM</h1>
        <h3>Registre sensações, compartilhe 
          experiências e eterniza momentos 
          das suas viagens com a gente!</h3> 
        <h2>Bem-vindo(a)!</h2>
        <h3>faça login para continuar</h3> 
        <form>
          <input id="emailLogin" type="email" placeholder="E-mail">
          <p id='emailAlertLogin'></p>
          <input id="passwordLogin" type="password" placeholder="Senha">
          <p id='passwordAlertLogin'></p> 
          <button id="buttonLogin"><a href="/#login">Login</a></button>
        </form> 
        <p>ou</p>
        <p>Fazer login com o Google</p>
        <section> 
          <button id="buttonGoogle"> Entre com sua conta Google</button>
        </section> 
        <section> 
          <p>Não tem uma conta? <button id="btnCreate"><a href="/#cadastro">Cadastre-se</a></button></p>
        </section> 
          <h4>Desenvolvido por Jayanny<a href="https://github.com/jay-santana"></a> e Sarah<a href="https://github.com/laosarah"></a></h4>
      </section>
      </main>  
    </body>
  `;
  container.innerHTML = template;

  const emailLogin = container.querySelector('#emailLogin');
  const passwordLogin = container.querySelector('#passwordLogin');
  const buttonLogin = container.querySelector('#buttonLogin');

  buttonLogin.addEventListener('click', function(event) {
    event.preventDefault();
    if(emailLogin.value === '') {
      container.querySelector('#emailAlertLogin').innerHTML = 'E-mail obrigatório'
    } 
    if(passwordLogin.value === '') {
      container.querySelector('#passwordAlertLogin').innerHTML = 'Senha obrigatória'
    } else {
    signIn(emailLogin.value, passwordLogin.value)
    .then((userCredential) => { 
      window.location.hash = "#feed";
      const user = userCredential.user;
    }) 
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
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

