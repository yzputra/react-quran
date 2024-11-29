const Select = ({surah, value, onScrollToIndex}) => {
  return (
    <div className="c-select">
      <label>
        Ayat
        <select 
          value={value}
          onChange={(e) => onScrollToIndex(e.target.value)}
          className="select"
        >
          { surah.verses.map((ayah, id) => (
            <option 
              key={id} 
              value={id}
            >
              {ayah.number.inSurah}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default Select;
