import { useState, useRef } from 'react';

import { 
  IoPlayOutline, 
  IoPlayBackOutline, 
  IoPlayForwardOutline,
  IoPauseOutline,
  IoCloseCircleOutline
} from 'react-icons/io5'

const style = {
  fontSize: '1.3rem'
}

const AudioPlayer = ({ surah, ayahId, onToggleAudioStatus }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(ayahId);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio(surah.verses[currentIndex].audio.primary)).current;
  const len = surah.numberOfVerses;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % len;
    setCurrentIndex(nextIndex);
    audioRef.src = surah.verses[nextIndex].audio.primary;
    audioRef.play();
    setIsPlaying(true);
  };

  const playPrev = () => {
    const prevIndex  = currentIndex != 0 ? currentIndex - 1 : 0;
    setCurrentIndex(prevIndex);
    audioRef.src = surah.verses[prevIndex].audio.primary;
    audioRef.play();
    setIsPlaying(true);
  };

  audioRef.ontimeupdate = () => {
    setCurrentTime(Math.floor((audioRef.currentTime % 3600) / 60).toString().padStart(2, '0') + ':' + Math.floor(audioRef.currentTime % 60).toString().padStart(2, '0'));
    setProgressBar((audioRef.currentTime / audioRef.duration || 0) * 100 + '%');
  }
  audioRef.onloadeddata = () => {
    setDuration(Math.floor((audioRef.duration % 3600) / 60).toString().padStart(2, "0") + ':' + Math.floor(audioRef.duration % 60).toString().padStart(2, '0'))
    setCurrentTime(Math.floor((audioRef.currentTime % 3600) / 60).toString().padStart(2, '0') + ':' + Math.floor(audioRef.currentTime % 60).toString().padStart(2, '0'));
  }

  const handleClose = () => {
    onToggleAudioStatus()
    audioRef.pause()
  }

  return (
    <div className={`c-player ${onToggleAudioStatus ? 'play' : ''}`}>
      <div className="player-content">
        <span 
          onClick={handleClose}
          className="player-close" 
        >
          <IoCloseCircleOutline style={style} />
        </span>
        <p className="player-title">{`Q.S ${surah.name.transliteration.id} - Ayat ${currentIndex}`}</p>
        <div className="flex-sb">
          <span onClick={playPrev}>
            <IoPlayBackOutline style={style} />
          </span>
          <span onClick={togglePlayPause}>
            { isPlaying 
              ? <IoPauseOutline style={style} />
              : <IoPlayOutline style={style} />
            }
          </span>
          <span onClick={playNext}>
            <IoPlayForwardOutline style={style} />
          </span>
        </div>
        <div className="progress-bar" style={{ width: progressBar }}></div>
        <div className="flex-sb">
          <small>{duration}</small>
          <small>{currentTime}</small>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer;
