'use client';
import { MutableRefObject, useRef, useState } from 'react';
import styles from '../styles/audioplayer.module.css';
import { BsArrowLeftShort, BsArrowRightShort, BsFillPlayCircleFill } from "react-icons/bs";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const audio = useRef() as MutableRefObject<HTMLAudioElement>;

  const playpause = () => {
    const previous = isPlaying;
    setIsPlaying(!previous);
    if (!previous) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }

  return (
    <div className={ styles.audioplayer }>
      <audio ref={audio} src="/audio/beat1.wav" />
      <div className={ styles.audiocontrols }>
        <button><BsArrowLeftShort /></button>
        <button onClick={() => { playpause() }} ><BsFillPlayCircleFill /></button>
        <button><BsArrowRightShort /></button>
      </div>
    </div>
  );
}
