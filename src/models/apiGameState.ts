export type ApiGameState = {
    players: ApiPlayer[],
    prompt: string,
    gameIsRunning: boolean,
}

export type ApiPlayer = {
    id: string,
    friendlyName?: string,
    isReady: boolean,
    lives: number,
    lastTyped: string,
}
