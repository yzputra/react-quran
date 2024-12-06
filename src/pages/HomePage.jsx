import SavedList from '../components/SavedList';
import { useState, useEffect } from 'react';
import SurahListings from '../components/SurahListings';

const HomePage = () => {
  const [surah, setSurah] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSurah = (surah) => {
    const filteredSurah = surah.filter((sur) => {
      return sur.name.transliteration.id.toLowerCase()
        .includes(inputValue.toLowerCase());
    })
    setSurah(filteredSurah);
  }

  useEffect(() => {
    const getSurah = async () => {
      const response = await fetch('https://api.quran.gading.dev/surah');
      const result = await response.json();
      handleSurah(result.data);
    }
    getSurah();
  }, [inputValue]);

  return (
    <main>
      <section className="content">
        <h1>Al-Quran Daring Indonesia</h1>
        <p>Baca al-quran secara daring dilengkapi dengan audio, terjemahan dan tafsir berbahasa Indonesia.</p>
      </section>
      <section className="content">
        <h2>Daftar Surah</h2>
        <form onChange={(e) => setInputValue(e.target.value)}>
          <input 
            className="search" 
            type="text" 
            placeholder="Cari surah..." 
          />
        </form>
        <SurahListings surah={surah} />
      </section>
    </main>
  )
}

export default HomePage;
