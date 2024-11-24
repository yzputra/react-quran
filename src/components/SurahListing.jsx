import { Link } from 'react-router-dom';

const SurahListing = ({ surah }) => {
  return (
    <Link to={`surah/${surah.number}`}>
    <div class="flex c-surah-item">
      <div class="surah-start">
        <span class="surah-num">{surah.number}</span>
      </div>
      <div class="surah-mid">
        <h3>{surah.name.transliteration.id}</h3>
        <p>{`${surah.revelation.id} • ${surah.numberOfVerses} `}</p>
        <p>{surah.name.translation.id}</p>
      </div>
      <div class="surah-end">
        <span class="surah-arabic">{surah.name.short}</span>
      </div>
    </div>
    </Link>
  )
}

export default SurahListing;
