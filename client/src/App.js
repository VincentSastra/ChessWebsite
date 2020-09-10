import React from 'react';
import './App.less';
import NavBar from './component/NavBar';
import ChessBoard from './component/ChessBoard';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NavBar />
                <ChessBoard />
            </header>
        </div>
    );
}

export default App;
