import { useState, useEffect } from 'react';

export default (shouldCountdown, date, callback) => {
    const [timer, setTimer] = useState('');

    useEffect(() => {
        let countDownDate = new Date(date);
        let isPast = false;
        let x = setInterval(function () {

            let now = new Date();

            let distance = countDownDate.getTime() - now.getTime();

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance > 0) {
                callback(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            } else {
                if (countDownDate.toLocaleDateString() == now.toLocaleDateString()) {
                    setTimer('Today')
                } else {
                    setTimer('Past')
                    isPast = true;
                }
            }

            console.log('timer')
            if (!shouldCountdown || countDownDate.toLocaleDateString() == now.toLocaleDateString() || isPast == true) {
                clearInterval(x);
            }
        }, 1000);
        //clean up code will run the next render
        return () => {
            clearInterval(x)
        };
    }, [shouldCountdown]);

    return timer;
}