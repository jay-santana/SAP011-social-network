import cadastro from './pages/register/register.js';
import feed from './pages/feed/feed.js';
import login from './pages/login/login.js';
import sobre from './pages/about/about.js';
import { verifyUserLogged } from './firebase-auth.js';

const main = document.getElementById('root');

function verifyHash() {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#cadastro':
      main.appendChild(cadastro());
      break;
    case '#feed':
      verifyUserLogged((user) => {
        if (user) {
          main.appendChild(feed());
        } else {
          main.appendChild(login());
          window.location.hash = '#login';
        }
      });
      break;
    case '#sobre':
      main.appendChild(sobre());
      break;
    default:
      main.appendChild(login());
  }
}

const init = () => {
  window.addEventListener('hashchange', () => {
    verifyHash();
  });
};

window.addEventListener('load', () => {
  verifyHash();
  init();
});

export { init };
