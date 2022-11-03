import logo from './logo.svg';
import './App.css';
import SignUp from './backend/API/signup';
function App() {
  const hadnle = (fil) =>{
    d.img1 = fil.target.files[0]
    SignUp(d)
  }
  const d = {
    name: "asd",
    email: "wws",
    password: "asdad",
    location: "wwww",
    carModel: "bmw",
    carType: "sedan",
    interests: "1 on 1",
    carBrand: 'whatever'
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="file" onChange={hadnle}></input>
      </header>
    </div>
  );
}

export default App;
