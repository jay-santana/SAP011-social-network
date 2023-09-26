import { db, auth } from '../../firebase-conf.js';
import { signOutBtn, accessUser } from '../../firebase-auth.js';
import { publication } from '../../firebase-store.js';
import { collection, addDoc, getDocs,  query, orderBy, QuerySnapshot, onSnapshot, updateDoc, Timestamp } from 'firebase/firestore';

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
    <h2 id="displayName">Olá, ${auth.currentUser.displayName}</h2>
    <section id="feed-container">
      <p id="open-publication">Conte-nos suas novas aventuras..</p>
    </section>
    <section id="publicationPoster"></section>
    <section id="fade" class="hide"></section>
    <section id="modal" class="hide">
      <span class="modal-header">
        <span class="material-symbols-outlined" id="close-modal">disabled_by_default</span>
      </span>
      <span class="modal-body">
        <div id="userPublication">
          <span class="material-symbols-outlined">account_circle</span><label id="userNamePublication">${auth.currentUser.displayName}</label>
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
  const user = accessUser();

  // Botão de sair 
  logoutMobileBtn.addEventListener('click', function (event) {
    event.preventDefault();
    signOutBtn().then(() => {
      window.location.hash = '#login';
    }).catch((error) => {
    });
  })

  // Modal para escrever as informações da publicação
  const toggleModal = () => {
    [modal, fade].forEach((event) => event.classList.toggle("hide"));
  };

  [openModal, closeModalButton, fade, publicationBtn].forEach((event) => {
    event.addEventListener("click", () => toggleModal());
  });


  // Criando a estrutura do post que vai aparecer no feed 
  function addPoster(data) {
    console.log(data.dataBox);
    const formattedDate = data.dataBox.toDate().toLocaleString();
    const templatePoster = `
    <section id="poster-container">
      <div id="poster">
        <span class="material-symbols-outlined">account_circle</span><label id="userPoster">${data.displayName}</label>
        <span id="dataBoxPoster">${formattedDate}</span>
      </div>
      <div id="textPoster-container">
        <span id="textBoxPoster">${data.textBox}</span>
      </div>
      <div id="locationPoster">
        <span class="material-symbols-outlined">location_on</span><span id="locationInputPoster">${data.locationInput}</span>
      </div>
      <div id="container-icons">
        <span class="material-symbols-outlined" id="like">favorite</span>
        <div id="edit-delete">
          <span class="material-symbols-outlined" id="edit">edit_square</span>
          <span class="material-symbols-outlined" id="delete">delete</span>
        </div>
      </div> 
    </section>
    `;
    publicationPoster.innerHTML += templatePoster;

    // Dentro da função addPoster
    const editButton = container.querySelector('#edit');
    editButton.addEventListener('click', () => {
      editPoster(data);
    });

  }


  //Adicionar dados ao Cloud Firestore
  publicationBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const data = {
      dataBox: Timestamp.now(), // Use serverTimestamp para obter a data e hora atual do servidor
      locationInput: locationInput.value,
      textBox: textBox.value,
      user: user.uid,
      displayName: user.displayName,
    }; 
    console.log(data);
   
    const posterCollection = collection(db, 'Diário de Viagem');

    // Adicione o novo post ao firestore
    const addDocPromise = addDoc(posterCollection, data);

    addDocPromise.then(() => {
        // Após adicionar o post ao firestore com sucesso, adicione-o ao feed
        loadPoster();
        // Limpa conteúdo do modal de publicação
        locationInput.value = '';
        textBox.value = '';
      })
      .catch(error => {
        console.error('Erro ao adicionar post:', error);
      });
  });

  // // Carregando o poster no feed 
  function loadPoster() { 
    publicationPoster.innerHTML = '';
    const posterCollection = collection(db, 'Diário de Viagem');
    const orderPoster = query(posterCollection, orderBy("dataBox", "desc"));
    getDocs(orderPoster).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        addPoster(postData);
      });
    }).catch((error) => {
      console.error('Erro ao carregar postagens ordenadas:', error);
    });
  }  
  loadPoster()


//Função Editar
function editPoster(data) {
  const modalEditContainer = document.createElement('div');
  const templateEdit = `
  <section id="containerEdit">
  <section id="fadeEdit" class="hide"></section>
  <section id="modalEdit" class="hide">
    <span class="modal-header-edit">
      <span class="material-symbols-outlined" id="close-modal-edit">disabled_by_default</span>
    </span>
    <span class="modal-body-edit">
      <div id="userPublicationEdit">
        <span class="material-symbols-outlined">account_circle</span><label id="userNamePublication">${auth.currentUser.displayName}</label>
      </div>
      <div>
        <textarea id="textBox" type="text">${data.textBox}</textarea>
      </div>
      <div id="location">
        <span class="material-symbols-outlined">location_on</span><input id="locationInput" type="text" value="${data.locationInput}">
      </div>
      <div id="publication">
        <button id="editBtnCancel">Cancelar</button>
        <button id="editBtnSave">Salvar</button>
      <div>
    </section>
  `;
  modalEditContainer.innerHTML = templateEdit;

  const openModalEdit = container.querySelector('#edit');
  const closeModalButtonEdit = modalEditContainer.querySelector('#close-modal-edit');
  const modalEdit = modalEditContainer.querySelector('#modalEdit');
  const fadeEdit = modalEditContainer.querySelector('#fadeEdit');
  const editBtnSave = modalEditContainer.querySelector('#editBtnSave');
  const editBtnCancel = modalEditContainer.querySelector('#editBtnCancel');// Modal para editar as informações da publicação

  const toggleModalEdit = () => {
  [modalEdit, fadeEdit].forEach((event) => event.classList.toggle("hide"));
  };

  [openModalEdit].forEach((event) => {
    event.addEventListener("click", () => toggleModalEdit());
  });

  [closeModalButtonEdit, fadeEdit, editBtnSave, editBtnCancel].forEach((event) => {
    event.addEventListener("click", () => modalEditContainer.remove());
  });

  container.appendChild(modalEditContainer);

}






  // const edit = container.querySelector('#edit');
  // // const editIt = edit.getAttribute('#')
  // edit.addEventListener('click', (event) => {
  //   console.log(event.target.parentNode);
  // });


  // event.target.parentNode 

  // mostra onde a pessoa clicou, e ainda retorna o id da publicação 
  // se clicou na lixeira, mostra modal excluir
  // se for editar, mostra modal editar 
  // se for curtir, faz o like ou o deslike 





return container;

};