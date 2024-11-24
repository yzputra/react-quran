import SavedList from '../components/SavedList';
import SurahListings from '../components/SurahListings';

const HomePage = () => {
  return (
    <main>
      <section className="content">
        <h1>Al-Quran Daring Indonesia</h1>
        <p>Baca al-quran secara daring dilengkapi dengan audio, terjemahan dan tafsir berbahasa Indonesia.</p>
      </section>
      <SurahListings />
    </main>
  )
}

export default HomePage;
