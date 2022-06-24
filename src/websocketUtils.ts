import {ApiGameState} from "./models/apiGameState";

export const mapMessageToGameState = (json: object): ApiGameState => {
    return json as ApiGameState;
}
