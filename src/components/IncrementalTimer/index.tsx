import { TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { parseNum } from '@/utils';

type Props = {
    time: number | 0;
    setTime: Dispatch<SetStateAction<number | 0>>;

    running: boolean;
    setRunning: Dispatch<SetStateAction<boolean>>;

    name: string;
}
const IncrementalTimer = ({ time, setTime, running, setRunning, name }: Props) => {
    const [timeout, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        setTimeoutId(setTimeout(() => {
            setTime(val => val + 10);
            startTimer();
        }, 10))
    };

    const stopTimer = () => clearTimeout(timeout!);

    useEffect(() => {
        if (running) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [running]);

    return (
        <div className='flex items-end'>
            <div className='w-20'>
                {/* <Button onClick={() => setRunning(val => !val)} variant='outlined' fullWidth>{!running && time != 0 ? "Resume" : running ? "Stop" : "Start"}</Button> */}
                {/* <Button onClick={() => setRunning(val => !val)} variant='outlined' fullWidth>{running ? "Stop" : "Start"}</Button> */}
            </div>
            <div className='w-24'>
                <TextField name={name} type='number' value={(time / 1000).toFixed(3)} onChange={ev => setTime(val => parseNum(ev.target.value) ?? val)} variant='standard' placeholder='0' fullWidth></TextField>
            </div>
            <p className='leading-10'>S</p>
            {/* <Button onClick={resetTimer} variant='outlined'>Reset</Button> */}
        </div>
    );
};

export default IncrementalTimer;
