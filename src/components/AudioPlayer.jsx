import { useState, useEffect, useRef } from 'react';

import { 
  IoPlayOutline, 
  IoPlayBackOutline, 
  IoPlayForwardOutline,
  IoPauseOutline
} from 'react-icons/io5'

const style = {
  fontSize: '1.3rem'
}

const AudioPlayer = ({ surah, ayahId, audioStatus, onToggleAudioStatus }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressBar, setProgressBar] = useState(0);

  const au = useRef(new Audio(
    surah.verses[ayahId].audio.primary
  )).current;
  
  au.ontimeupdate = () => {
    setCurrentTime(Math.floor((au.currentTime % 3600) / 60).toString().padStart(2, '0') + ':' + Math.floor(au.currentTime % 60).toString().padStart(2, '0'));
    setProgressBar((au.currentTime / au.duration || 0) * 100 + '%');
  }
  au.onloadeddata = () => {
    setDuration(Math.floor((au.duration % 3600) / 60).toString().padStart(2, "0") + ':' + Math.floor(au.duration % 60).toString().padStart(2, '0'))
  } 

  const handlePlaying = () => au.paused ? au.play() : au.pause();
  
  const handleClose = () => {
    onToggleAudioStatus()
    au.pause();
  }

  return (
    <div className={`c-player ${onToggleAudioStatus ? 'play' : ''}`}>
      <div className="player-content">
        <span 
          onClick={handleClose}
          className="player-close" 
        >
          x
        </span>
        <p className="player-title">{`${surah.name.transliteration.id} (${surah.name.translation.id}) - Ayat ${ayahId +1}`}</p>
        <div className="flex-sb">
          <span>
            <IoPlayBackOutline style={style} />
          </span>
          <span
            onClick={handlePlaying}
          >
            { au.paused 
              ? <IoPlayOutline style={style} />
              : <IoPauseOutline style={style} />
            }
          </span>
          <span>
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
