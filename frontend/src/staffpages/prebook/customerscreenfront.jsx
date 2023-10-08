import QRCode from "react-qr-code";
import { useEffect, useState, useRef } from 'react';

export default function CustomerScreenFront() {
    const [background, setBackground] = useState('https://media.giphy.com/media/1S3KRs6pOXHYA/giphy.gif');
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);

    const playAudio = () => {
        if (audioRef1.current && audioRef2.current) {
            audioRef1.current.volume = 0.3; // adjust volume for first audio source
            audioRef1.current.play();
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            // play your second audio here
            if (audioRef2.current) {
                audioRef2.current.play();

            }
        }, 30000); // 60000 milliseconds is 1 minute
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const gifTimer = setInterval(() => {
            setBackground(background === 'https://media.giphy.com/media/1S3KRs6pOXHYA/giphy.gif' ? 'https://media.giphy.com/media/1S3KRs6pOXHYA/giphy.gif' : 'https://media.giphy.com/media/1S3KRs6pOXHYA/giphy.gif');
        }, 60000);
        return () => clearInterval(gifTimer);
    }, [background]);

    return (
        <div className="flex flex-col bg-cover h-screen items-center justify-center" style={{backgroundImage: `url('${background}')`}} onClick={playAudio}>
            <audio ref={audioRef1} src={process.env.PUBLIC_URL + '/front.mp3'} loop />
            <audio ref={audioRef2} src={process.env.PUBLIC_URL + '/entrance.mp3'}  />
            <h1 className="text-4xl text-white mb-8 component-title">Welcome to Cheeky Dino</h1>
            <div className="flex w-full">
                <div className="w-1/2 flex items-center justify-center">
                    <QRCode value="https://main.d38zwwmxfhxt52.amplifyapp.com/customerprebooking" />
                </div>
                <div className="w-1/2 flex items-center justify-center text-white mr-3 text-bold text-lg">
                    <p className="component-title">If you have Pre-booked a session please scan the QR code on the screen. </p>
                </div>
            </div>
        </div>
    )
}
