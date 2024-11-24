import { Link } from 'react-router-dom';

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

const BottomSheet = ({ isActive, isTranslate, onToggleTranslate, onToggleTafsir, onClose }) => {
  return (
    <div className={`c-sheet ${isActive}`}>
      <div className="sheet-list">
        <span 
          onClick={onClose}
          className="sheet-close">
        </span>
        <span>
          <IoBookmarkOutline style={style} />
          <a href="#">Simpan</a>
        </span>
        <span 
          onClick={onToggleTafsir}
        > 
          <IoBookOutline style={style} />
          Baca tafsir
        </span>
        <span>
          <IoPlayOutline style={style} />
          <a href="#">Dengarkan ayat</a>
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
