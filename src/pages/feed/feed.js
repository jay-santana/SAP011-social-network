import {
  collection,
  doc,
  addDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { signOutUser, accessUser, auth } from '../../firebase-auth.js';
import {
  likePoster,
  editPoster,
  deletePoster,
  loadPoster,
  db,
} from '../../firebase-store.js';
// import { db } from '../../firebase-conf.js';

const posts = 'posts';

export default () => {
  const posterCollection = collection(db, posts);
  const container = document.createElement('div');
  const template = `
  <body>
    <header id="menu-header">
      <nav id="nav-header">
        <ul id="ul-header">
          <li class="li-header">
            <h1 id="title">Diário de Viagem</h1>
          </li>
          <li class="li-header">
            <span id="logoutHeaderTwo" class="material-symbols-outlined">logout</span><button id="logoutMobileBtn">Sair</button>
          </li>
        </ul>
      </nav>
    </header>
    <section class="containerSidebar">
      <nav class="sidebar close">
        <section class="menuHeader">
          <aside class="logo-text">
            <div class="logo">
              <a class="text nav-text"><span id="logoSidebarOne" class="iconsLogo material-symbols-outlined">travel</span></a><p id ="textLogo">DIÁRIO DE VIAGEM</p> 
            </div>
          </aside>
          <span class="material-symbols-outlined toggle">chevron_right</span>
        </section>
        <section class="menuBar">
          <div class="menuBody">
            <ul class="menuLinks">
              <li class="li-navLinks">
                <a class="text nav-text" href="/#feed"><span id="homeSidebarOne" class="icons material-symbols-outlined">home</span><p class="textLink">Feed</p></a>
              </li>
              <li class="li-navLinks">
                <a class="text nav-text" href="/#about"><span id="infoSidebarOne" class="icons material-symbols-outlined">info</span><p class="textLink">Sobre</p></a>
              </li>
              <li class="li-navLinks">
                <button id="logoutSidebarBtn"><span id="logoutSidebarOne" class="icons material-symbols-outlined">logout</span><p class="textLink">Sair</p></button>
              </li>
            </ul>
          </div>
        </section>
      </nav>
      <main id="feed-page">
        <h2 id="displayName">Olá, ${auth.currentUser.displayName}</h2>
        <section id="feed-container">
          <p id="open-publication">Conte-nos suas novas aventuras..</p>
        </section>
        <section id="publicationPoster"></section>
        <section id="fade" class="hide"></section>
        <section id="modal" class="hide">
        <section class="modal-header">
          <div id="userPublicationPoster">
            <span id="iconUserPublication" class="material-symbols-outlined">account_circle</span><label id="userNamePublication">${auth.currentUser.displayName}</label>
          </div>
          <div id="closePublication">
            <span id="close-modal" class="material-symbols-outlined">disabled_by_default</span>
          </div>
        </section>
          <span class="modal-body">
            <div>
              <textarea id="textBox" type="text" placeholder="Digite aqui seu texto"></textarea>
            </div>
            <div id="location">
              <span id="iconLocationPublication" class="material-symbols-outlined">location_on</span><input id="locationInput" type="text" placeholder="Localização">
            </div>
            <div id="publication">
              <button id="publicationBtn">Publicar</button>
            <div>
          </span>
        </section>
      </main>
    </section>  
    <footer id="menuFooter">
      <nav id="nav-footer">
        <ul id="ul-footer">
          <li class="li-footer">
            <span id="homeFooterTwo" class="material-symbols-outlined">home</span><a href="/#feed">Feed</a>
          </li>
          <li class="li-footer">
            <span id="infoFooterTwo"class="material-symbols-outlined">info</span><a href="/#about">Sobre</a>
          </li>
          <li class="li-footer">
            <span id="arrowUpFooterTwo" class="material-symbols-outlined">keyboard_double_arrow_up</span><button id="btnTopMobile">Topo</button>
          </li>
        </ul>
      </nav>
    </footer>
  </body>
  `;
  container.innerHTML = template;

  const sidebar = container.querySelector('.sidebar');
  const toggle = container.querySelector('.toggle');

  // Função para expandir o menu sidebar desktop
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const buttonMobileTop = container.querySelector('#btnTopMobile');
  buttonMobileTop.addEventListener('click', scrollToTop);

  const logoutMobileBtn = container.querySelector('#logoutMobileBtn');
  const logoutSidebarBtn = container.querySelector('#logoutSidebarBtn');
  const openModal = container.querySelector('#feed-container');
  const closeModalButton = container.querySelector('#close-modal');
  const modal = container.querySelector('#modal');
  const fade = container.querySelector('#fade');
  const publicationBtn = container.querySelector('#publicationBtn');
  const locationInput = container.querySelector('#locationInput');
  const textBox = container.querySelector('#textBox');
  const publicationPoster = container.querySelector('#publicationPoster');
  const user = accessUser();

  // Modal para escrever as informações da publicação
  const toggleModal = () => {
    [modal, fade].forEach((event) => event.classList.toggle('hide'));
  };
  [openModal, closeModalButton, fade, publicationBtn].forEach((event) => {
    event.addEventListener('click', () => toggleModal());
  });

  // Atualizar edição do poster no feed
  function updatePoster(postIdSave, textBoxEditValue, locationInputEditValue) {
    // Fazer atualização do poster conforme o ID recebido
    const postToEdit = publicationPoster.querySelector(`#_${postIdSave}`);
    postToEdit.querySelector('#textBoxPoster').innerHTML = textBoxEditValue;
    postToEdit.querySelector('#locationInputPoster').innerHTML = locationInputEditValue;
    console.log('qual o valor de: ', postToEdit);
  }

  // Atualizar poster deletado do feed
  function updateDelete(postIdDelete) {
    const postToDelete = publicationPoster.querySelector(`#_${postIdDelete}`);
    postToDelete.remove();
  }

  // Atualizar likes no poster do feed
  function updateLike(postIdLike, number) {
    const postToLike = publicationPoster.querySelector(`#_${postIdLike}`);
    postToLike.querySelector('#likesCount').innerHTML = `${number}`;
    const btn = postToLike.querySelector('.like');
    if (number > 0) {
      btn.classList.add('filled');
    } else {
      btn.classList.remove('filled');
    }
  }

  // Limpar Tela
  function limparTela() {
    publicationPoster.innerHTML = '';
  }

  // Botão de sair mobile
  logoutMobileBtn.addEventListener('click', (event) => {
    event.preventDefault();
    signOutUser().then(() => {
      window.location.hash = '#login';
    }).catch((error) => {
      console.log(error);
    });
  });

  // Botão de sair desktop
  logoutSidebarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    signOutUser().then(() => {
      window.location.hash = '#login';
    }).catch((error) => {
      console.log(error);
    });
  });

  // Modal Editar
  function modalEditPoster(data, postId) {
    console.log(data);
    const modalEditContainer = document.createElement('div');
    const templateEdit = `
    <section id="containerEdit">
      <section id="fadeEdit"></section>
      <section id="fadeEdit"></section>
      <section id="modalEdit">
        <section class="modal-header-edit">
          <div id="userPublicationEdit">
            <span id="iconUserEdit" class="material-symbols-outlined">account_circle</span><label id="userNamePublication">${auth.currentUser.displayName}</label>
          </div>
          <div id="closeEdit">
            <span id="close-modal-edit" class="material-symbols-outlined">disabled_by_default</span>
          </div>
        </section>
        <span class="modal-body-edit">
          <div>
            <textarea id="textBoxEdit" type="text">${data.textBox}</textarea>
          </div>
          <div id="locationEdit">
            <span id="iconLocationEdit" class="material-symbols-outlined">location_on</span><input id="locationInputEdit" type="text" value="${data.locationInput}">
          </div>
          <div id="publicationEdit">
            <button id="editBtnCancel">Cancelar</button>
            <button id="editBtnSave" data-postId="${postId}">Salvar</button>
          </div>
        </span>  
      </section>  
    </section>
    `;

    modalEditContainer.innerHTML = templateEdit;
    const openModalEdit = container.querySelector('.edit');
    const closeModalButtonEdit = modalEditContainer.querySelector('#close-modal-edit');
    const modalEdit = modalEditContainer.querySelector('#modalEdit');
    const fadeEdit = modalEditContainer.querySelector('#fadeEdit');
    const editBtnSave = modalEditContainer.querySelector('#editBtnSave');
    const editBtnCancel = modalEditContainer.querySelector('#editBtnCancel');

    // Modal para editar as informações da publicação
    const toggleModalEdit = () => {
      [modalEdit, fadeEdit].forEach((event) => event.classList.toggle('hide'));
    };
    console.log(openModalEdit);

    [openModalEdit].forEach((event) => {
      event.addEventListener('click', () => toggleModalEdit());
    });

    [closeModalButtonEdit, fadeEdit, editBtnSave, editBtnCancel].forEach((event) => {
      event.addEventListener('click', () => modalEditContainer.remove());
    });

    container.appendChild(modalEditContainer);

    // Botão editar
    editBtnSave.addEventListener('click', (event) => {
      event.preventDefault();
      // Obtenha os valores dos campos de edição
      const textBoxEditValue = modalEditContainer.querySelector('#textBoxEdit').value;
      const locationInputEditValue = modalEditContainer.querySelector('#locationInputEdit').value;
      const postIdSave = editBtnSave.dataset.postid; // Obtenha o postId da publicação a ser editada
      // Atualiza os dados editados da publicação no feed
      editPoster(postIdSave, textBoxEditValue, locationInputEditValue, updatePoster);
      // Feche o modal de edição
      toggleModalEdit();
    });
  }

  // Adicionar função para editar posts
  function attachEditOnPosts() {
    // Icone Editar - dentro da função addPoster
    const editButtons = container.querySelectorAll('#iconEditFeed');
    console.log('recuperando os botões de editar', editButtons);
    editButtons.forEach((editButton) => {
      editButton.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('Botão editar clicado');
        const docRef = doc(db, posts, editButton.dataset.postid);
        const docSnap = await getDoc(docRef);
        console.log(editButton.dataset.postid);
        // Verifica se o usuário logado é o mesmo que criou a publicação
        if (docSnap.exists() && docSnap.data().user === auth.currentUser.uid) {
          modalEditPoster(docSnap.data(), editButton.dataset.postid, 'textBoxEdit');
          console.log('Usuário pode editar esta publicação');
        } else {
          console.log('Usuário não pode editar esta publicação');
        }
      });
    });
  }

  // Criando a estrutura do post que vai aparecer no feed
  function templatePoster(data) {
    const formattedDate = data.dataBox.toDate().toLocaleString('pt-br');
    return `
    <section id="_${data.postId}" class="poster-container">
      <div id="poster">
        <span id="userPosterIcon" class="material-symbols-outlined">account_circle</span><label id="userName">${data.displayName}</label>
        <span id="dataBoxPoster">${formattedDate}</span>
      </div>
      <div id="informsPublication">
        <div id="textPoster-container">
          <span id="textBoxPoster">${data.textBox}</span>
        </div>
        <div id="locationPoster">
          <span id="iconLocationFeed" class="material-symbols-outlined">location_on</span><span id="locationInputPoster">${data.locationInput}</span>
        </div>
      </div>  
      <div id="container-icons">
        <div id="container-likes">
          <span id= "iconLikeFeed" class="like material-symbols-outlined ${data.likes.length > 0 ? 'filled' : ''}" data-postId="${data.postId}">favorite</span>
          <p id="likesCount">${data.likes.length}</p>
        </div>  
        <div id="edit-delete">
          ${data.user === auth.currentUser.uid ? `<span id="iconEditFeed" class="material-symbols-outlined edit" data-postId="${data.postId}">edit_square</span>` : ''}
          ${data.user === auth.currentUser.uid ? `<span id="iconDeleteFeed" class="material-symbols-outlined delete" data-postId="${data.postId}">delete</span>` : ''}
        </div>
      </div> 
    </section>
    `;
  }

  // Adiciona o templatePoster no feed
  function addPoster(data) {
    publicationPoster.innerHTML += templatePoster(data);
  }

  // Modal Excluir publicação
  function deletePosterModal(postId) {
    console.log('postId: ', postId);
    const modalDeleteContainer = document.createElement('div');
    const templateDelete = `
    <section id="containerDelete">
      <section id="fadeDelete"></section>
      <section id="fadeDelete"></section>
      <section id="modalDelete">
        <span class="modal-header-delete">
          <span id="close-modal-delete" class="material-symbols-outlined">disabled_by_default</span>
        </span>
        <span class="modal-body-delete">
          <div id="areaTextBoxDelete">
            <span id="textBoxDelete" type="text">"Você tem certeza que deseja excluir essa publicação?"</span>
          </div>
          <div id="publicationDelete">
            <button id="deleteBtnCancel">Cancelar</button>
            <button id="deleteBtnSave" data-postId="${postId}">Salvar</button>
          </div>
        </span>
      </section>
    </section>
    `;
    modalDeleteContainer.innerHTML = templateDelete;
    const openModalDelete = container.querySelectorAll('.delete');
    const closeModalButtonDelete = modalDeleteContainer.querySelector('#close-modal-delete');
    const modalDelete = modalDeleteContainer.querySelector('#modalDelete');
    const fadeDelete = modalDeleteContainer.querySelector('#fadeDelete');
    const deleteBtnSave = modalDeleteContainer.querySelector('#deleteBtnSave');
    const deleteBtnCancel = modalDeleteContainer.querySelector('#deleteBtnCancel');

    // Modal para excluir as informações da publicação
    const toggleModalDelete = () => {
      [modalDelete, fadeDelete].forEach((event) => event.classList.toggle('hide'));
    };
    console.log(openModalDelete);

    openModalDelete.forEach((event) => {
      event.addEventListener('click', () => toggleModalDelete());
    });

    [closeModalButtonDelete, fadeDelete, deleteBtnSave, deleteBtnCancel].forEach((event) => {
      event.addEventListener('click', () => modalDeleteContainer.remove());
    });

    container.appendChild(modalDeleteContainer);

    // Botão Salvar Modal Delete
    deleteBtnSave.addEventListener('click', async (event) => {
      event.preventDefault();
      // Obtenha o postId da publicação a ser excluida
      const postIdDelete = deleteBtnSave.dataset.postid;
      console.log('Publicação excluida com sucesso');
      // Recarregue o feed para refletir as alterações
      deletePoster(postIdDelete, updateDelete);
      // Feche o modal Delete
      toggleModalDelete();
    });
  }

  // Adicionar função para excluir posts
  function attachDeleteOnPosts() {
    const deleteButtons = container.querySelectorAll('.delete');
    console.log('recuperando os botões de delete');
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const docRef = doc(db, posts, deleteButton.dataset.postid);
        console.log(deleteButton.dataset.postid);
        const docSnap = await getDoc(docRef);
        // Verifica se o usuário logado é o mesmo que criou a publicação
        if (docSnap.exists() && docSnap.data().user === auth.currentUser.uid) {
          console.log('Usuário pode excluir esta publicação');
          deletePosterModal(deleteButton.dataset.postid);
        } else {
          console.log('Usuário não pode excluir esta publicação');
        }
      });
    });
  }

  // Adicionar função para dar like nos posts
  async function attachLikeOnPosts() {
    const likeButtons = container.querySelectorAll('.like');
    console.log('recuperando os botões para dar like', likeButtons);
    likeButtons.forEach((likeButton) => {
      likeButton.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('clique botão');
        const postIdLike = likeButton.dataset.postid;
        likePoster(postIdLike, updateLike);
      });
    });
  }

  // Adicionar dados ao Cloud Firestore
  publicationBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
      dataBox: Timestamp.now(), // serverTimestamp para obter a data e hora atual do servidor
      locationInput: locationInput.value,
      textBox: textBox.value,
      user: user.uid,
      displayName: user.displayName,
      likes: [],
    };
    console.log('valor: ', data);
    // Adicione o novo post ao firestore
    const addDocPromise = addDoc(posterCollection, data);
    addDocPromise.then((docId) => {
      data.postId = docId.id;
      console.log(docId.id);
      const containerPost = document.createElement('div');
      containerPost.innerHTML = templatePoster(data);
      publicationPoster.prepend(containerPost);
      attachLikeOnPosts();
      attachEditOnPosts();
      attachDeleteOnPosts();
      // Limpa conteúdo do modal de publicação
      locationInput.value = '';
      textBox.value = '';
    })
      .catch((error) => {
        console.error('Erro ao adicionar post:', error);
      });
  });

  loadPoster(addPoster, limparTela, attachLikeOnPosts, attachEditOnPosts, attachDeleteOnPosts);

  return container;
};

// Teste para descobrir o erro no elemento
// debugger;
