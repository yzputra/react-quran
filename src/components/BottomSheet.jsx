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

const BottomSheet = ({ isOpen, isTranslate, onToggleTranslate, onToggleTafsir, onToggleAudioStatus, onCloseSheet }) => {
  return (
    <div className={`c-sheet ${isOpen ? 'active' : ''}`}>
      <div className="sheet-list">
        <span 
          onClick={onCloseSheet}
          className="sheet-close">
        </span>
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
          { isTranslate ?  'Tampilkan terjemah' : 'Sembunyikan terjemah' } 
        </span>
      </div>
    </div>
  )
}

export default BottomSheet;
