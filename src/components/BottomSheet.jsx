import { useRef, useEffect } from 'react';
import { 
  IoBookmarkOutline, 
  IoBookOutline,
  IoPlayOutline,
  IoLanguageOutline,
} from 'react-icons/io5';

const style = {
  display: 'inline-block',
  fontSize: '1.2rem',
  margin: '0 15px -5px 0',
}

const BottomSheet = ({ isOpen, isShowTranslate, onToggleTranslate, onToggleTafsir, onToggleAudioStatus, onCloseSheet }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const listNode  = listRef.current;
    const listEl = listNode.querySelectorAll('span');

    listEl.forEach((el) => el.addEventListener('click', () => onCloseSheet(false)))

  }, []);

  return (
    <div className={`c-sheet ${isOpen ? 'active' : ''}`}>
      <div className="sheet-list" ref={listRef}>
        <button 
          onClick={() => onCloseSheet(false)}
          className="sheet-close">
        </button>
        <span>
          <IoBookmarkOutline style={style} />
          Simpan
        </span>
        <span 
          onClick={onToggleTafsir}
        > 
          <IoBookOutline style={style} />
          Baca tafsir
        </span>
        <span
          onClick={onToggleAudioStatus}
        >
          <IoPlayOutline style={style} />
          Dengarkan ayat
        </span>
        <span
          onClick={onToggleTranslate}
        > 
          <IoLanguageOutline style={style} /> 
          { isShowTranslate ?  'Tampilkan terjemah' : 'Sembunyikan terjemah' } 
        </span>
      </div>
    </div>
  )
}

export default BottomSheet;
