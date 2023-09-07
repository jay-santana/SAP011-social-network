export default () => {
  const container = document.createElement('div');

  const template = `
    <h2>PAG de cadastro de novo usuário</h2>
    <p>Aqui vai a página de cadastro com as informações que os usuários precisam apresentar</p>
  `;
  container.innerHTML = template;
  return container;
};
