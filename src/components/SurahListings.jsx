import { useState, useEffect } from 'react';
import SurahListing from '../components/SurahListing';

const SurahListings = () => {
  const [surah, setSurah] = useState([]);

  useEffect(() => {
    const getSurah = async () => {
      const response = await fetch("https://api.quran.gading.dev/surah");
      const result = await response.json()
      setSurah(result.data)
    }
    getSurah()
  }, [])

  return (
    <section className="content">
      <h2>Daftar Surah</h2>
      <form>
        <input className="search" type="text" placeholder="Search..." />
      </form>
      <div className="c-surah-list">
        {surah.map((surah, id) => (
          <SurahListing
            key={id}
            surah={surah}
          />
        ))}
      </div>
    </section>
  )
}

export default SurahListings;
