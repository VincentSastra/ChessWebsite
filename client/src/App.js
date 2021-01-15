import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ChessBoard from './component/ChessBoard';
import Menu from './component/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
