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
            <span id="logout" class="material-symbols-outlined">logout</span><button id="btnLogoutMobile">Sair</button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
    <section id='feed-container'>
      <p>O "Diário de Viagem" é uma plataforma 
        digital concebida para atender tanto os 
        entusiastas de viagens ávido por 
        aventura quanto os viajantes mais 
        casuais. Ele não é apenas um aplicativo 
        ou site, é um companheiro de viagem 
        virtual que transforma suas aventuras em 
        histórias para serem lembradas e 
        compartilhadas. Seja para inspiração 
        futura, para ajudar outros a explorar 
        novos horizontes ou simplesmente para 
        reviver momentos especiais, este produto 
        foi projetado para satisfazer os viajantes 
        em todos os lugares, ajudando-os a criar 
        memórias inesquecíveis.
      </p>
      <h4>Desenvolvedoras</h4>
      <section>
        <span>PERFIL DESENVOLVEDORA 1 </span>
        <h5>Jay Santana</h5>
        <span>icone linkedin</span>
        <span>icone github</span>
      </section>
      <section>
        <span>PERFIL DESENVOLVEDORA 2 </span>
        <h5>Sarah Lao</h5>
        <span>icone linkedin</span>
        <span>icone github</span>
      </section>
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
  return container;
};
