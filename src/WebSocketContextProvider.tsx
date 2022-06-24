import React, {createContext, useContext} from "react";

const ws = new WebSocket('wss://explosion-party-backend.herokuapp.com/');
const SocketContext = createContext(ws);

interface WebSocketContextProps {
    children?: React.ReactNode
}

export const WebSocketContextProvider: React.FC<WebSocketContextProps> = ({
    children,
                                                                  }) => {
    return (
        <SocketContext.Provider value={ws}>
            {children}
        </SocketContext.Provider>
    )
}

export const useWebsocket = () => {
    const context = useContext(SocketContext);
    if (!context){
        throw Error();
    }
    return context;
}
