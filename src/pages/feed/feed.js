import { signOutBtn } from "../../firebase-auth.js";
import { publication } from '../../firebase-store.js';

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
    <main id="feed-page">
    <h2 id="displayName"></h2>
    <section id="feed-container">
      <input id="publication-text" type="text" placeholder="Conte-nos suas novas aventuras..">
    </section>
    <section id="publicationPoster"></section>
    <section id="fade" class="hide"></section>
    <section id="modal" class="hide">
      <span class="modal-header">
        <span class="material-symbols-outlined" id="close-modal">disabled_by_default</span>
      </span>
      <span class="modal-body">
        <div id="userPublication">
          <span class="material-symbols-outlined">account_circle</span><label id="userNamePublication"></label>
        </div>
        <div id="dataPublication">
          <input id="dataBox" type="text" placeholder="20/09/2023">
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
  const userNamePublication = container.querySelector('#userNamePublication');
  const logoutMobileBtn = container.querySelector('#logoutMobileBtn');
  const openModal = container.querySelector('#feed-container');
  const closeModalButton = container.querySelector('#close-modal');
  const modal = container.querySelector('#modal');
  const fade = container.querySelector('#fade');
  const publicationBtn = container.querySelector('#publicationBtn');
  const dataBox = container.querySelector('#dataBox');
  const locationInput = container.querySelector('#locationInput');
  const textBox = container.querySelector('#textBox');
  const publicationPoster = container.querySelector('#publicationPoster');


  function updateUsername(createUserName) {
    displayName.textContent = `Olá, ${createUserName}!`;
    userNamePublication.textContent = `${createUserName}`;
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

  logoutMobileBtn.addEventListener('click', function (event) {
    event.preventDefault();
    signOutBtn().then(() => {
      window.location.hash = '#login';
    }).catch((error) => {
    });
  })

  const toggleModal = () => {
    [modal, fade].forEach((event) => event.classList.toggle("hide"));
  };

  [openModal, closeModalButton, fade].forEach((event) => {
    event.addEventListener("click", () => toggleModal());
  });

  //Adicionar dados ao Cloud Firestore
  publicationBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const data = {
      dataBox: dataBox.value,
      locationInput: locationInput.value,
      textBox: textBox.value,
    };
    publication(data);
  });

  const feedPoster = document.createElement('div');

  const templatePoster = `
  <section id="poster">
    <div id="userPoster">
      <span class="material-symbols-outlined">account_circle</span><label id="userNamePoster"></label>
    </div>
    <div id="dataPoster">
      <input id="dataBoxPoster" type="text">
    </div>
    <div>
      <textarea id="textBoxPoster" type="text"></textarea>
    </div>
    <div id="locationPoster">
      <span class="material-symbols-outlined">location_on</span><input id="locationInputPoster" type="text">
    </div>
  </section>
  `;
  feedPoster.innerHTML = templatePoster;


  return container;
};
