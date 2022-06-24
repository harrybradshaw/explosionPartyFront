import React, {useEffect} from "react";
import {ApiPlayer} from "./models/apiGameState";
import {GamePlayer} from "./GamePlayer";

interface LobbyListProps {
    members: ApiPlayer[],
    currentGuesser: string|undefined,
    explosionCounter: number,
}

export const LobbyList: React.FC<LobbyListProps> = ({
    members,
    currentGuesser,
    explosionCounter,
}) => {
    const guesserIndex = members.findIndex(member => member.id === currentGuesser);

    useEffect(() => {
        if (explosionCounter){

        }
    },[explosionCounter])

    return (
        <>
            {members.map((member, index) =>
                <React.Fragment key={index}>
                    <GamePlayer
                        key={member.id}
                        player={member}
                        isCurrent={currentGuesser === member.id}
                    />
                </React.Fragment>
            )}
            {currentGuesser !== undefined &&
                <div
                    className={`col centerItem-${members.length}-${guesserIndex}`}
                >
                    <div
                        className={'heartbeat'}
                    >
                        {'--->'}
                    </div>
                </div>
            }
        </>
    );
};
