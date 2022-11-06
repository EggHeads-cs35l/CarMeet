import "./index.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { FiChevronsDown } from "react-icons/fi";
function App()
{
    return(
        <>
        <BrowserRouter>
        <nav class="navbar navbar-light navbar-expand-md navigation-home">
          <div class="container">
            <a href="/">
            </a>
            <button
              data-bs-toggle="collapse"
              class="navbar-toggler"
              data-bs-target="#navcol-1"
            >
              <span class="visually-hidden">Toggle navigation</span>
              <span class="">
              <FiChevronsDown />
              </span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link home-link" href="/Home">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link home-link" href="/Profile">
                    My Profile
                  </a>
                </li>        
              </ul>
            </div>
            </div>
            </nav>
            <Routes />
            </BrowserRouter>
        </>
    );
}

export default App