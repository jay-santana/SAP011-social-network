import { signOutBtn } from "../../firebase-auth.js";
// import { auth } from '../../firebase-conf.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <body>
    <header id="menu-header">
      <nav id="nav-header">
        <ul id="ul-header">
          <li id="li-header">
            <h1 id="title">Diário de Viagem</h1>
          </li>
          <li id="li-header">
            <span id="logout" class="material-symbols-outlined">logout</span><button id="logoutMobileBtn">Sair</button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
    <section id="feed-container">
      <h2 id="displayName"></h2>
      <input id="publication-text" type="text" placeholder="Conte-nos suas novas aventuras..">
    </section>
    </main>
    <footer id="menuFooter">
      <nav id="nav-footer">
        <ul id="ul-footer">
          <li id="li-footer">
            <span class="material-symbols-outlined">home</span><a href="/#feed">Feed</a>
          </li>
          <li id="li-footer">
            <span class="material-symbols-outlined">info</span><a href="/#sobre">Sobre</a>
          </li>
          <li id="li-footer">
            <span class="material-symbols-outlined">keyboard_double_arrow_up</span><button id="btnTopMobile">Topo</button>
          </li>
        </ul>
      </nav>
    </footer>
  </body>
  `;
  container.innerHTML = template;

  const displayName = container.querySelector('#displayName');

  function updateUsername(createUserName) {
    displayName.textContent = `Olá, ${createUserName}!`;
}
// Adiciona um ouvinte de eventos personalizados para 'userCreated' e 'userLoggedIn'
window.addEventListener('userCreated', (event) => {
    const createUserNameCreate = event.detail;
    updateUsername(createUserNameCreate);
});
//Adiciona um ouvinte de eventos personalizados para 'userLoggedIn'
window.addEventListener('userLoggedIn', (event) => {
    const createUserNameLogin = event.detail;
    updateUsername(createUserNameLogin);
});

const logoutMobileBtn = container.querySelector('#logoutMobileBtn');

logoutMobileBtn.addEventListener('click', function(event) {
  event.preventDefault();

  signOutBtn().then(() => {
    window.location.hash = '#login';
    }).catch((error) => {
    });
})

  return container;
};
