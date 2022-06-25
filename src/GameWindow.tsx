import React, {useRef, useState} from "react";
import {Username} from "./Username";
import {GamePrompt} from "./GamePrompt";
import {LobbyList} from "./LobbyList";
import {GameInput} from "./GameInput";
import {useWebsocket} from "./WebSocketContextProvider";
import {ApiPlayer} from "./models/apiGameState";
import {mapMessageToGameState} from "./websocketUtils";
import './GameWindow.scss';
import {ReadyButton} from "./ReadyButton";

export const GameWindow: React.FC = () => {
    const ws = useWebsocket();
    const [gameWord, setGameWord] = useState('');
    const [lobbyMembers, setLobbyMembers] = useState<ApiPlayer[]>([]);
    const [currentGuesser, setCurrentGuesser] = useState<string|undefined>(undefined);
    const [guessWasCorrect, setGuessWasCorrect] = useState<boolean>(true);
    const [gameIsRunning, setGameIsRunning] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [explosionCounter, setExplosionCounter] = useState(0);
    const [promptOptions, setPromptOptions] = useState([]);
    const id = useRef<string>();

    //const currentUser = lobbyMembers.filter(player => player.id === id.current);

    ws.onopen = () => {
        ws.send(JSON.stringify({event: 'join'}))
    };

    ws.onmessage = event => {
        const json = JSON.parse(event.data);
        json['word'] && setGameWord(json['word']);
        if(json['id']) {
            id.current = json['id'];
        }
        if (json['players']){
            const gameState = mapMessageToGameState(json);
            setLobbyMembers(gameState.players);
            setGameIsRunning(gameState.gameIsRunning);
            setPlayerReady(gameState.players.find(player => player.id === id.current)?.isReady ?? false)
        }
        if(json['currentGuesser'] !== undefined){
            console.log(json['currentGuesser']);
            json['currentGuesser'] === ''
                ? setCurrentGuesser(undefined)
                : setCurrentGuesser(json['currentGuesser']);
        }
        if(json['isCorrect'] !== undefined){
            setGuessWasCorrect(json['isCorrect']);
        }
        if(json['explosion']){
            setExplosionCounter(pv => pv + 1);
        }
        if(json['promptOptions']){
            setPromptOptions(json['promptOptions']);
        }
    }

    return (
        <div className={"grid"} key={'grid'}>
            <div className={"col-3"}/>

            <div
                className={"col justify-content-center flex flex-column align-items-center"}
                key={'container'}
            >
                <GamePrompt
                    selectedPrompt={gameWord}
                    promptOptions={promptOptions}
                    gameIsRunning={gameIsRunning}
                />
                <div
                    className={`mainWindow-${lobbyMembers.length} grid`}
                >
                    <LobbyList
                        members={lobbyMembers}
                        currentGuesser={currentGuesser}
                        explosionCounter={explosionCounter}
                    />
                </div>
                {gameIsRunning
                    ? <GameInput
                        isCurrent={id.current === currentGuesser}
                        isCorrect={guessWasCorrect}
                        explosionCount={explosionCounter}
                        key={'GameInput'}
                    />
                    : <ReadyButton
                        isReady={playerReady}
                        lobbyMembers={lobbyMembers}
                    />
                }
            </div>
            <div
                className={"col-3"}
            >
                <Username />
            </div>

        </div>
    )
}
