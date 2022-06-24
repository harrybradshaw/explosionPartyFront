import React, {FormEvent, useState} from "react";
import {useWebsocket} from "./WebSocketContextProvider";
import {InputText} from "primereact/inputtext";
import './GameInput.scss';
import classNames from "classnames";

interface InputWord {
    isCurrent: boolean,
    isCorrect: boolean,
}

export const GameInput: React.FC<InputWord> = ({
    isCurrent,
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
                    className={classNames()}
                >
                </InputText>
            </form>
        </div>
    )
}
