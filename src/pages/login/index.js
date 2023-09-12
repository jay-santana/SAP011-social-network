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
          <input id="email" type="text" placeholder="E-mail">
          <p id='emailAlert'></p>
          <input id="password" type="password" placeholder="Senha">
          <p id='passwordAlert'></p> 
          <button id="btnLogin"><a href="/#login">Login</a></button>
        </form> 
        <p>ou</p>
        <p>Fazer login com o Google</p>
        <section> 
          <button id="google"> Entre com sua conta Google</button>
        </section> 
        <section> 
          <p>Não tem uma conta? <button id="btnCadastro"><a href="/#cadastro">Cadastre-se</a></button></p>
        </section> 
          <h4>Desenvolvido por Jayanny<a href="https://github.com/jay-santana"></a> e Sarah<a href="https://github.com/laosarah"></a></h4>
      </section>
      </main>  
    </body>
  `;
  container.innerHTML = template;

  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const buttonLogin = container.querySelector('#btnLogin');

  buttonLogin.addEventListener('click', function(event) {
    event.preventDefault();
    if(email.value === '') {
      container.querySelector('#emailAlert').innerHTML = 'E-mail obrigatório'
    } 
    if(password.value === '') {
      container.querySelector('#passwordAlert').innerHTML = 'Senha obrigatória'
    } else {
    signIn(email.value, password.value)
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

