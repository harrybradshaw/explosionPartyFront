import React from "react";
import {Dropdown, DropdownChangeParams} from "primereact/dropdown";
import {useWebsocket} from "./WebSocketContextProvider";

interface GetPromptProps {
    promptOptions: string[]
    selectedPrompt: string,
    gameIsRunning: boolean,
}

export const GamePrompt: React.FC<GetPromptProps> = ({
    promptOptions,
    selectedPrompt,
    gameIsRunning,
}) => {
    const ws = useWebsocket();

    const handleChange = (newValue: DropdownChangeParams) => {
        ws.send(JSON.stringify({
            event: 'promptSelected',
            value: newValue.value,
        }));
    }

    return (
        <Dropdown
            value={selectedPrompt}
            options={promptOptions}
            disabled={gameIsRunning}
            onChange={handleChange}
            placeholder={'Select a prompt...'}
        />
    )
}
