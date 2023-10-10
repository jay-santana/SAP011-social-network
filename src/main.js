import register from './pages/register/register.js';
import feed from './pages/feed/feed.js';
import login from './pages/login/login.js';
import about from './pages/about/about.js';
import { verifyUserLogged } from './firebase-auth.js';

const main = document.getElementById('root');

function verifyHash() {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#register':
      main.appendChild(register());
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
    case '#about':
      main.appendChild(about());
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
