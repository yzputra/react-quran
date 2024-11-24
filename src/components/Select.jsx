const Select = ({ surah, value, onScrollToIndex }) => {
  return (
    <div className="c-select">
      <label>Ayat</label>
      <select 
        value={value}
        onChange={(e) => onScrollToIndex(e.target.value)}
        className="select"
      >
        { surah.verses.map((ayah, id) => (
          <option 
            key={id} 
            value={ayah.number.inSurah}
          >
            {ayah.number.inSurah}
          </option>
        )) }
      </select>
    </div>
  )
}

export default Select;
