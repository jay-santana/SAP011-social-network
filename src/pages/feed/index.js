export default () => {
    const container = document.createElement('div');

    const template = `
    <h2>PAG do feed</h2>
    <p>Aqui vai a página do feed com as publicações</p>
    `;
    container.innerHTML = template;

    return container;
}