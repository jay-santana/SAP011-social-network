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
      <input id="user" type="text" placeholder="Nome de usuário">
      <input id="email" type="text" placeholder="E-mail">
      <input id="password" type="password" placeholder="Senha"> 
      <input id="password" type="password" placeholder="Confirmar senha"> 
      <button id="passwordConfirm"><a href="/#feed">Cadastrar</a></button>
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
  return container;
};
