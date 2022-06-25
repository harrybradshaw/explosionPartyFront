import React, {FormEvent, useEffect, useState} from "react";
import {useWebsocket} from "./WebSocketContextProvider";
import {InputText} from "primereact/inputtext";
import './GameInput.scss';

interface InputWord {
    isCurrent: boolean,
    isCorrect: boolean,
    explosionCount: number,
}

export const GameInput: React.FC<InputWord> = ({
    isCurrent,
    explosionCount,
}) => {
    const [value, setValue] = useState<string>('');
    const ws = useWebsocket();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ws.send(JSON.stringify({
            event: 'guess',
            guess: value
        }))
        setValue('');
    }

    useEffect(() => {
        if (explosionCount){
            setValue('');
        }
    },[explosionCount])

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                id={'form'}
            >
                <InputText
                    id={'user-input'}
                    value={value}
                    onChange={nv => {
                        setValue(nv.currentTarget.value)
                        ws.send(JSON.stringify({
                            event: 'typing',
                            value: nv.currentTarget.value,
                        }))
                    }}
                    disabled={!isCurrent}
                    autoComplete="off"
                >
                </InputText>
            </form>
        </div>
    )
}
