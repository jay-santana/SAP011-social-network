export default () => {
  const container = document.createElement('div');

  const template = `
    <h2>PAG de login</h2>
    <p>Aqui vai a página para o usuário efetuar o login</p>
  `;
  container.innerHTML = template;
  return container;
};
