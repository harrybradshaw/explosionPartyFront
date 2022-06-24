import React, {useState} from "react";
import {useWebsocket} from "./WebSocketContextProvider";
import {InputText} from "primereact/inputtext";

export const Username: React.FC = () => {
    const ws = useWebsocket();
    const [myName, setMyName] = useState<string>('');
    const handleUsernameUpdate = (): void => {
        const request = {
            event: 'usernameUpdate',
            value: myName,
        }
        ws.send(JSON.stringify(request));
    }

    return (
        <InputText
            type={'text'}
            value={myName}
            onChange={e => setMyName(e.currentTarget.value)}
            onBlur={() => handleUsernameUpdate()}
            placeholder={'Enter your name...'}
            autoComplete="off"
        />
    )
}
