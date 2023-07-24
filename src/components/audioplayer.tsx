'use client';
import { MutableRefObject, useRef, useState } from 'react';
import styles from '../styles/audioplayer.module.css';

export default function AudioPlayer() {
  const audio = {
    name: "Dark Beat 01",
    path: "/audio/beat1.wav",
    author: "Ítalo",
    img: "/placeholder/musician.jpg"
  }
  // const [audio, setAudio] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const audioElement = useRef() as MutableRefObject<HTMLAudioElement>;

  const playpause = () => {
    const previous = isPlaying;
    setIsPlaying(!previous);
    if (!previous) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }

  return (
    <div className={ styles.audioplayer }>
      <audio ref={audioElement} src={audio.path} />
      <div className={ styles.audiodetails }>
        <div className={ styles.audiodetailsimg }>
          <img alt="Audio image" src={ audio.img } />
        </div>
        <div className={ styles.audiodetailsinfo }>
          <div><p>{ audio.name }</p></div>
          <div><p>by { audio.author }</p></div>
        </div>
      </div>
      <div className={ styles.audiocontrols }>
        <div><img alt="Icon random" src="/icons/Shuffle.png" /></div>
        <div><img alt="Icon rewind" src="/icons/Rewind.png" /></div>
        <div onClick={() => { playpause() }}><img src="/icons/Play.png" /></div>
        <div><img alt="Icon fast forward" src="/icons/FastForward.png" /></div>
      </div>
      <div className={ styles.audiovolume }>
        <div><img alt="Icon speaker" src="/icons/Speaker.png" /></div>
        <input type="range" min="1" max="100" defaultValue="75" />
        <div><img alt="Icon faders" src="/icons/Faders.png" /></div>
      </div>
    </div>
  );
}
