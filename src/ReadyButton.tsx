import React from "react";
import {Button} from "primereact/button";
import {useWebsocket} from "./WebSocketContextProvider";
import {ApiPlayer} from "./models/apiGameState";

interface ReadyButtonProps {
    isReady: boolean,
    lobbyMembers: ApiPlayer[],
}

export const ReadyButton: React.FC<ReadyButtonProps> = ({
    isReady,
    lobbyMembers,
                                                        }) => {
    const ws = useWebsocket();
    const handleClick = () => {
        ws.send(JSON.stringify({
            event: 'playerReady'
        }));
    }
    const numReady = lobbyMembers.filter(player => player.isReady).length

    return (
        <Button
            label={isReady
                ? `Waiting for start - ${numReady}/${lobbyMembers.length} ready`
                : `Join Game - ${numReady}/${lobbyMembers.length} ready`}
            disabled={isReady}
            onClick={handleClick}
        />
    );
}
