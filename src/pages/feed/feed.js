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
    <h2 id="displayName"></h2>
    <section id="feed-container">
      <input id="publication-text" type="text" placeholder="Conte-nos suas novas aventuras..">
    </section>
    <section id="fade" class="hide"></section>
    <section id="modal" class="hide">
      <span class="modal-header">
        <span class="material-symbols-outlined" id="close-modal">disabled_by_default</span>
      </span>
      <span class="modal-body">
        <div id="userPublication">
        <span class="material-symbols-outlined">account_circle</span><label>Nome de Usuário</label>
        </div>
        <div>
          <textarea id="textBox" type="text" placeholder="Digite aqui seu texto"></textarea>
        </div>
        <div id="location">
          <span class="material-symbols-outlined">location_on</span><input id="locationInput" type="text" placeholder="Localização">
        </div>
        <div id="publication">
          <button id="publicationBtn">Publicar</button>
        <div>
      </span>
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

  const openModal = container.querySelector("#feed-container");
  const closeModalButton = container.querySelector("#close-modal");
  const modal = container.querySelector("#modal");
  const fade = container.querySelector("#fade");

  const toggleModal = () => {
    [modal, fade].forEach((event) => event.classList.toggle("hide"));
  };

  [openModal, closeModalButton, fade].forEach((event) => {
    event.addEventListener("click", () => toggleModal()); 
  });

  return container;
};
