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
      <h2>Olá, Nome de usuário!</h2>
      <input id="publication-text" type="text" placeholder="Conte-nos suas novas aventuras..">
    </main>
    <footer id="menuFooter">
      <nav id="nav-footer">
        <ul id="ul-footer">
          <li id="li-footer">
            <span class="material-symbols-outlined">house</span><a href="/#feed">Feed</a>
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
