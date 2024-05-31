import { useEffect, useState, useRef } from 'react';
import { Storage } from 'aws-amplify';
import QRCode from "react-qr-code";

export default function CustomerScreenFront() {
  const [background, setBackground] = useState('https://media.giphy.com/media/1S3KRs6pOXHYA/giphy.gif');
  const [audioSrc1, setAudioSrc1] = useState('');
  const [audioSrc2, setAudioSrc2] = useState('');
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  useEffect(() => {
    // Fetch audio files from AWS storage
    Storage.get('front.mp3', { level: 'public' })
      .then(result => setAudioSrc1(result))
      .catch(err => console.log(err));

    Storage.get('entrance.mp3', { level: 'public' })
      .then(result => setAudioSrc2(result))
      .catch(err => console.log(err));
  }, []);

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
      <audio ref={audioRef1} src={audioSrc1} loop />
      <audio ref={audioRef2} src={audioSrc2} />
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
