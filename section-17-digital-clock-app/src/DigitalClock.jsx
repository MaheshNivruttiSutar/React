import { useState, useEffect } from 'react';
import backgroundImage from './assets/background.jpg';


function DigitalClock() {
    const [time, setTime] = useState(new Date());


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    function formatTime(time) {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours < 12 ? 'AM' : 'PM';
        hours = hours % 12 || 12;
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }


    function padZero(number) {
        return (number < 10 ? '0' : "") + number;
    }

    return (
        <div className="digital-clock-container">
            <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="clock">
                <span className="time">{formatTime(time)}</span>
            </div>




            <h1>Digital Clock</h1>
        </div>
    )
}
export default DigitalClock