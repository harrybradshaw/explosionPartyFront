import React from "react";
import {Sidebar} from "primereact/sidebar";
import {ApiGameSettings} from "./models/apiGameState";
import {Slider} from "primereact/slider";
import classNames from "classnames";
import {useWebsocket} from "./WebSocketContextProvider";

interface SettingsBarProps {
    isSettingsVisible: boolean,
    setIsSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    gameSettings: ApiGameSettings,
}

export const SettingsBar: React.FC<SettingsBarProps> = ({
    isSettingsVisible,
    setIsSettingsVisible,
    gameSettings,
}) => {
    const ws = useWebsocket();
    const handleLivesUpdate = (newValue: number) => {
        newValue !== gameSettings.startingLives &&
            ws.send(JSON.stringify( {
                event: 'settingsUpdate',
                value: {...gameSettings, startingLives: newValue}
            }));
    }

    const handleTimerUpdate = (newValue: number) => {
        newValue !== gameSettings.defaultTimeout &&
            ws.send(JSON.stringify( {
                event: 'settingsUpdate',
                value: {...gameSettings, defaultTimeout: newValue}
            }));
    }

    return (
        <Sidebar
            onHide={() => setIsSettingsVisible(false)}
            visible={isSettingsVisible}
            position={'right'}
        >
            <div className={classNames('my-2')}>
                <h4>Starting Lives: {gameSettings.startingLives}</h4>
                <Slider
                    value={gameSettings.startingLives}
                    min={1}
                    max={10}
                    onChange={e => handleLivesUpdate(e.value as number)}
                    step={1}
                />
            </div>
            <div className={classNames('my-2')}>
                <h4>Bomb Timer: {gameSettings.defaultTimeout}s</h4>
                <Slider
                    value={gameSettings.defaultTimeout}
                    min={3}
                    max={20}
                    onChange={e => handleTimerUpdate(e.value as number)}
                    step={1}
                />
            </div>
        </Sidebar>
    )
}


