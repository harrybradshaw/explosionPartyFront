import React from 'react';
import './App.scss';
import {WebSocketContextProvider} from "./WebSocketContextProvider";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import {GameWindow} from "./GameWindow";                                //icons

function App() {
    return (
        <WebSocketContextProvider>
            <div className="App">
                <header className="App-header">
                    <GameWindow />
                </header>
            </div>
        </WebSocketContextProvider>
    );
}

export default App;
