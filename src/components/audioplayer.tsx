'use client';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from '../styles/audioplayer.module.css';

export default function AudioPlayer() {
  const audios = [
    {
      name: "Dark Beat 01",
      path: "https://beats-nft-bucket.s3.sa-east-1.amazonaws.com/beat+1.wav",
      author: "Ítalo",
      img: "/placeholder/musician.jpg",
    },
    {
      name: "Dark Beat 02",
      path: "https://beats-nft-bucket.s3.sa-east-1.amazonaws.com/beat+2.wav",
      author: "Ítalo",
      img: "/placeholder/musician.jpg",
    },
    {
      name: "Dark Beat 03",
      path: "https://beats-nft-bucket.s3.sa-east-1.amazonaws.com/beat+3.wav",
      author: "Ítalo",
      img: "/placeholder/musician.jpg",
    }
  ];
  const [selected, setSelected] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currenttime, setCurrenttime] = useState(0);
  const [duration, setDuration] = useState(0);

  const animationRef = useRef() as MutableRefObject<any>;
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;
  const progressbarRef = useRef() as MutableRefObject<HTMLInputElement>;
  
  useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
    progressbarRef.current.max = `${seconds}`;
  }, [audioRef?.current?.onloadedmetadata]);

  const calculatetime = (secs: number) => {
    const minutes = Math.floor(secs/60);
    const returnmin = (minutes < 10) ? `0${ minutes }` : `${ minutes }`;
    const seconds = Math.floor(secs%60);
    const returnsecs = (seconds < 10) ? `0${ seconds }` : `${ seconds }`;
    return `${ returnmin }:${ returnsecs }`;
  }

  const playpause = () => {
    const previous = isPlaying;
    setIsPlaying(!previous);
    if (!previous) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whileplaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whileplaying = () => {
    const val = Number(progressbarRef.current.value);
    progressbarRef.current.value = `${ audioRef.current.currentTime }`;
    changeplayercurrenttime(val);
    animationRef.current = requestAnimationFrame(whileplaying);
  }
  
  const changerange = () => {
    const val = Number(progressbarRef.current.value);
    audioRef.current.currentTime = val;
    changeplayercurrenttime(val);
  }

  const changeplayercurrenttime = (value: number) => {
    progressbarRef.current.style.setProperty('--seek-before-width', `${ value / duration * 100 }%`);
    setCurrenttime(value);
  }

  const random = () => {}
  
  const rewind = () => {
    // if duration < 10
    // rewind
    // else
    // previous one
  }

  const next = () => {
    const val = (selected + 1) % audios.length;
    setSelected(val);
    // play current music
  }
  
  const repeat = () => {}

  const mute = () => {
    const previous = isMuted;
    setIsMuted(!previous);
    if (!previous) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  }

  const changevolume = () => {
    // TODO: change volume with input
  }

  return (
    <div className={ styles.audioplayer }>
      <audio ref={audioRef} src={ audios[selected].path } />
      <div className={ styles.audiodetails }>
        <div className={ styles.audiodetailsimg }>
          <img alt="Audio image" src={ audios[selected].img } />
        </div>
        <div className={ styles.audiodetailsinfo }>
          <div><p>{ audios[selected].name }</p></div>
          <div><p>by { audios[selected].author }</p></div>
        </div>
      </div>
      <div className={ styles.audiocontrols }>
        <div className={ styles.audiocontrolsbtns }>
          <div onClick={() => { random() }}><img alt="Icon random" src="/icons/Shuffle.png" /></div>
          <div onClick={() => { rewind() }}><img alt="Icon rewind" src="/icons/Rewind.png" /></div>
          <div onClick={() => { playpause() }}><img src="/icons/Play.png" /></div>
          <div onClick={() => { next() }}><img alt="Icon fast forward" src="/icons/FastForward.png" /></div>
          <div onClick={() => { repeat() }}><img alt="Icon repeat" src="/icons/Repeat.png" /></div>
        </div>
        <div className={ styles.audiocontrolsprogress }>
          <p className={ styles.audiocontrolsprogresscurrenttime }>{ calculatetime(currenttime) }</p>
          <input type="range" className={ styles.audiocontrolsprogressbar } defaultValue="0" onChange={ changerange }/>
          <p className={ styles.audiocontrolsprogressduration }>{(duration && !isNaN(duration)) && calculatetime(duration) }</p>
        </div>
      </div>
      <div className={ styles.audiovolume }>
        <div onClick={() => { mute() }}><img alt="Icon speaker" src="/icons/Speaker.png" /></div>
        <input ref={progressbarRef} type="range" min="1" max="100" defaultValue="75" />
        <div><img alt="Icon faders" src="/icons/Faders.png" /></div>
      </div>
    </div>
  );
}
