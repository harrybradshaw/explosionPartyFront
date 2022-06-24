import React from "react";
import {ApiPlayer} from "./models/apiGameState";
import 'primeicons/primeicons.css';

interface PlayerProps {
    player: ApiPlayer,
    isCurrent: boolean,
}

export const GamePlayer: React.FC<PlayerProps> = ({
    player,
}) => {
    return (
        <div
            className={"circleItem flex flex-column align-items-center justify-content-center"}
        >
                <div>
                    {player.friendlyName ?? player.id}
                </div>
                <div className="flex flex-row">
                    {[...Array(player.lives)].map((e, index) => (
                        <i className="pi pi-heart-fill p-x-2" key={`${player}-lives-${index}`} />
                        )
                    )}
                </div>
                <div>
                    {player.lives == 0
                        ? <s> {player.lastTyped} </s>
                        : player.lastTyped
                    }
                </div>
        </div>
    );
};
