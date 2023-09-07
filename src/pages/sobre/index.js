export default () => {
    const container = document.createElement('div');

    const template = `
    <h2>PAG sobre o projeto e desenvolvedoras</h2>
    <p>Aqui vai a página com informações adicionais do projeto</p>
    <p>E informações de contato das desenvolvedoras</p>  
    `;

    container.innerHTML = template;

    return container;
}