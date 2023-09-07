import cadastro from "./pages/cadastro/index.js";
import feed from "./pages/feed/index.js";
import login from "./pages/login/index.js";
import sobre from "./pages/sobre/index.js";

const main = document.querySelector("#root");

const init = () => {
    window.addEventListener("hashchange", () => {
        // console.log(window.location.hash)
        main.innerHTML = ""; 
        switch(window.location.hash){
          case "#login":
            main.appendChild(login());
            break;
          case "#cadastro":
            main.appendChild(cadastro());
            break;
          case "#feed":
            main.appendChild(feed());
            break;
          case "#sobre":
            main.appendChild(sobre());
            break;
          default:
            main.appendChild(login());
        }
    });
}

window.addEventListener("load", () => {
    main.appendChild(login());
    init();
});