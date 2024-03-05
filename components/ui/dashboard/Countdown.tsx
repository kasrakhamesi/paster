import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { LoaderIcon } from 'react-hot-toast';

const Countdown = ({ futureTime, setEnabled }: { futureTime: number, setEnabled:(b:boolean) => void }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [daysLeft, setDaysLeft] = useState('');

    useEffect(() => {
        // Update the time left every second
        const intervalId = setInterval(() => {
            const now = moment().unix();
            const diff = futureTime - now;

            if (diff <= 0) {
                clearInterval(intervalId);
                setTimeLeft('The time has come!');
                setEnabled(true)
            } else {
                const duration = moment.duration(diff, 'seconds');

                const months = duration.months();
                const days = duration.days();
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();
                const dayLeft = months + " mos " + days + " d"
                const timeLeft = hours + "H : " + minutes + "M : " + seconds + "S";
                setTimeLeft(timeLeft);
                setDaysLeft(dayLeft)
            }
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [futureTime]);

    return (
        <div className='flex items-center justify-center w-full text-xs'>
            {futureTime && timeLeft ?
                <>
                    {daysLeft}
                    {daysLeft && <br />}
                    {timeLeft}
                </>
                : <LoaderIcon />
            }
        </div>
    );
}

export default Countdown;
