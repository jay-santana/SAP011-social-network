export default () => {
  const container = document.createElement('div');

  const template = `
    <body>
      <main>
        <h1>DIÁRIO DE VIAGEM</h1>
        <h3>Registre sensações, compartilhe 
          experiências e eterniza momentos 
          das suas viagens com a gente!</h3> 
        <h2>Bem-vindo(a)!</h2>
        <h3>faça login para continuar</h3> 
        <form>
          <input id="email" type="text" placeholder="E-mail">
          <input id="password" type="password" placeholder="Senha"> 
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
      </main>  
    </body>
  `;
  container.innerHTML = template;
  // container.querySelector(#idDoInput); exemplo de como vai ficar mais ou menos
  // manipulação de dom 
  // click de botão  
  return container;
};
