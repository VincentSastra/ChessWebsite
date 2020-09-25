import React from 'react';
import './App.less';
import NavBar from './component/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ChessBoard from './component/ChessBoard';
import Menu from './component/Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Router>
          <Switch>
            <Route path="/" exact component={Menu}/>
            <Route path="/play" exact component={ChessBoard}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
