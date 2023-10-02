import { db, auth } from '../../firebase-conf.js';
import { signOutBtn, accessUser } from '../../firebase-auth.js';
import { editPoster, deletePoster } from '../../firebase-store.js';
import { collection, doc, addDoc, getDocs, query, orderBy, updateDoc, Timestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { async } from 'regenerator-runtime';

const posts = "posts";
export default () => {
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
    <main id="feed-page">
    <h2 id="displayName">Olá, ${auth.currentUser.displayName}</h2>
    <section id="feed-container">
      <p id="open-publication">Conte-nos suas novas aventuras..</p>
    </section>
    <section id="publicationPoster"></section>
    <section id="fade" class="hide"></section>
    <section id="modal" class="hide">
      <span class="modal-header">
        <span id="close-modal" class="material-symbols-outlined">disabled_by_default</span>
      </span>
      <span class="modal-body">
        <div id="userPublication">
          <span id="iconUserPublication" class="material-symbols-outlined">account_circle</span><label id="userNamePublication">${auth.currentUser.displayName}</label>
        </div>
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
    <footer id="menuFooter">
      <nav id="nav-footer">
        <ul id="ul-footer">
          <li id="li-footer">
            <span id="homeFooterTwo" class="material-symbols-outlined">home</span><a href="/#feed">Feed</a>
          </li>
          <li id="li-footer">
            <span id="infoFooterTwo"class="material-symbols-outlined">info</span><a href="/#sobre">Sobre</a>
          </li>
          <li id="li-footer">
            <span id="arrowUpFooterTwo" class="material-symbols-outlined">keyboard_double_arrow_up</span><button id="btnTopMobile">Topo</button>
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

  //Função Editar
  function modalEditPoster(data, postId) {
    console.log(data);
    const modalEditContainer = document.createElement('div');
    const templateEdit = `
    <section id="containerEdit">
      <section id="fadeEdit" class="hide"></section>
      <section id="modalEdit" class="hide">
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
            <span id="iconLocationEdit"class="material-symbols-outlined">location_on</span><input id="locationInputEdit" type="text" value="${data.locationInput}">
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
    const editBtnCancel = modalEditContainer.querySelector('#editBtnCancel'); // Modal para editar as informações da publicação

    const toggleModalEdit = () => {
      [modalEdit, fadeEdit].forEach((event) => event.classList.toggle("hide"));
    };
    console.log(openModalEdit);

    [openModalEdit].forEach((event) => {
      event.addEventListener("click", () => toggleModalEdit());
    });

    [closeModalButtonEdit, fadeEdit, editBtnSave, editBtnCancel].forEach((event) => {
      event.addEventListener("click", () => modalEditContainer.remove());
    });

    container.appendChild(modalEditContainer);

    // Botão editar 
    editBtnSave.addEventListener('click', function (event) {
      event.preventDefault();
    
      // Obtenha os valores dos campos de edição
      const textBoxEditValue = modalEditContainer.querySelector('#textBoxEdit').value;
      const locationInputEditValue = modalEditContainer.querySelector('#locationInputEdit').value;
      const postIdSave = editBtnSave.dataset.postid; // Obtenha o postId da publicação a ser editada

      // Use updateDoc para atualizar os dados no Firestore
      const docRef = doc(db, posts, postIdSave)
      updateDoc(docRef, {
        textBox: textBoxEditValue,
        locationInput: locationInputEditValue,
      });
      console.log('Publicação editada com sucesso');
  
      // Recarregue o feed para refletir as alterações
      loadPoster();

      // Feche o modal de edição
      toggleModalEdit();
    }) 
  }

  // Criando a estrutura do post que vai aparecer no feed 
  function addPoster(data) {
    console.log('addPoster');
    const formattedDate = data.dataBox.toDate().toLocaleString('pt-br');
    const templatePoster = `
    <section id="_${data.postId}" class="poster-container">
      <div id="poster">
        <span id="userPoster" class="material-symbols-outlined">account_circle</span><label>${data.displayName}</label>
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
          <span id= "iconLikeFeed" class="like material-symbols-outlined" data-postId="${data.postId}">favorite</span>
          <p id="likesCount">${data.likes.length}</p>
        </div>  
        <div id="edit-delete">
          ${data.user === auth.currentUser.uid ? `<span id="iconEditFeed" class="material-symbols-outlined edit" data-postId="${data.postId}">edit_square</span>` : ''}
          ${data.user === auth.currentUser.uid ? `<span id="iconDeleteFeed" class="material-symbols-outlined delete" data-postId="${data.postId}">delete</span>` : ''}
        </div>
      </div> 
    </section>
    `;
    publicationPoster.innerHTML += templatePoster;
  }


  // Modal Excluir publicação 
  function deletePosterModal(postId) {
    console.log("postId: ", postId);
    const modalDeleteContainer = document.createElement('div');
    const templateDelete = `
    <section id="containerDelete">
      <section id="fadeDelete" class="hide"></section>
      <section id="modalDelete" class="hide">
        <span class="modal-header-delete">
          <span class="material-symbols-outlined" id="close-modal-delete">disabled_by_default</span>
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
    const deleteBtnCancel = modalDeleteContainer.querySelector('#deleteBtnCancel'); // Modal para excluir as informações da publicação

    const toggleModalDelete = () => {
      [modalDelete, fadeDelete].forEach((event) => event.classList.toggle("hide"));
    };
    console.log(openModalDelete);

    openModalDelete.forEach((event) => {
      event.addEventListener("click", () => toggleModalDelete());
    });

    [closeModalButtonDelete, fadeDelete, deleteBtnSave, deleteBtnCancel].forEach((event) => {
      event.addEventListener("click", () => modalDeleteContainer.remove());
    });

    container.appendChild(modalDeleteContainer);


    // Botão Salvar Modal Delete 
    deleteBtnSave.addEventListener('click', async function (event) {
      event.preventDefault();
    
      // Obtenha o postId da publicação a ser excluida 
      const postIdDelete = deleteBtnSave.dataset.postid; 
      console.log(postIdDelete);

      // Use updateDoc para atualizar os dados no Firestore
      await deleteDoc(doc(db, posts, postIdDelete));
        console.log(deleteDoc);
        console.log('Publicação excluida com sucesso');
    
        // Recarregue o feed para refletir as alterações
        loadPoster();
    
        // Feche o modal Delete 
        toggleModalDelete();
    })
  }
  

  const posterCollection = collection(db, posts);

  //Adicionar dados ao Cloud Firestore
  publicationBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const data = {
      dataBox: Timestamp.now(), // Use serverTimestamp para obter a data e hora atual do servidor
      locationInput: locationInput.value,
      textBox: textBox.value,
      user: user.uid,
      displayName: user.displayName,
      likes: [],
    };
    console.log(data);

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

  // Adicionar função para dar like nos posts
  function attachLikeOnPosts() {
    const likeButtons = container.querySelectorAll('.like');
    console.log("recuperando os botões para dar like", likeButtons);

    let atualizarLike = async (btn, likes = undefined) => {
      if (likes == undefined) {
        const docRef = doc(db, posts, btn.dataset.postid);
        const docSnap = await getDoc(docRef);
        likes = docSnap.data().likes;
      }

      console.log("atualizarLike: ", btn, likes);
      if (likes.length > 0) {
        btn.classList.add("filled");
      } else {
        btn.classList.remove("filled");
      }
    };

    likeButtons.forEach((likeButton) => {
      atualizarLike(likeButton);
      likeButton.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log("clique botão");
        let uid = auth.currentUser.uid;
        console.log(uid);
        const docRef = doc(db, posts, likeButton.dataset.postid);
        const docSnap = await getDoc(docRef);
        let likes = docSnap.data().likes;
        console.log("Like button: ", likes);
        if (likes.length > 0 && likes.includes(uid)) {
          likes = likes.filter(o => o != uid);
        } else {
          likes.push(uid);
        }
        updateDoc(docRef, {
          likes: likes
        });
        atualizarLike(likeButton, likes);
        loadPoster();
      });
    });
  }

  // Adicionar função para editar posts
  function attachEditOnPosts() {
    // Icone Editar - dentro da função addPoster
    const editButtons = container.querySelectorAll(`.edit`);
    console.log("recuperando os botões de editar", editButtons);
    
    editButtons.forEach((editButton) => {
      editButton.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log("Edit button clicked");

        const docRef = doc(db, posts, editButton.dataset.postid);
        const docSnap = await getDoc(docRef);
        console.log(editButton.dataset.postid);
        
        // Verifica se o usuário logado é o mesmo que criou a publicação
        if (docSnap.exists() && docSnap.data().user === auth.currentUser.uid) {
          modalEditPoster(docSnap.data(), editButton.dataset.postid, 'textBoxEdit');
          console.log("Usuário pode editar esta publicação");
        } else {
          console.log("Usuário não pode editar esta publicação");
        }
      });   
    }); 
  }

  // Adicionar função para excluir posts
  function  attachDeleteOnPosts() {
    const deleteButtons = container.querySelectorAll('.delete');
    console.log("recuperando os botões de delete");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener('click', async function (event) {
        event.preventDefault();
        // Teste para descobrir o erro no elemento 
        // debugger;
        // const docRef = doc(db, posts, deleteButton.dataset.postId);
        const docRef = doc(db, posts, deleteButton.dataset.postid);
        console.log(deleteButton.dataset.postid);
        const docSnap = await getDoc(docRef);
        
        // Verifica se o usuário logado é o mesmo que criou a publicação
        if (docSnap.exists() && docSnap.data().user === auth.currentUser.uid) {
          console.log("Usuário pode excluir esta publicação");
          deletePosterModal(deleteButton.dataset.postid);
        } else {
          console.log("Usuário não pode excluir esta publicação");
        }
      });
    });
  }

  // Carregando o poster no feed 
  function loadPoster() {
    publicationPoster.innerHTML = '';
    const posterCollection = collection(db, posts);
    const orderPoster = query(posterCollection, orderBy("dataBox", "desc"));
    getDocs(orderPoster).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        postData.postId = doc.id;
        addPoster(postData);
      });
      attachLikeOnPosts();
      attachEditOnPosts();
      attachDeleteOnPosts();
    }).catch((error) => {
      console.error('Erro ao carregar postagens ordenadas:', error);
    });
  }
  loadPoster()

  return container;
};
