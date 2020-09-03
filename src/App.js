import React from 'react';
import logo from './logo.svg';
import './App.less';
import './component/NavBar';
import NavBar from "./component/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
