import { useState, useRef } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import AyahListing from '../components/AyahListing';
import BottomSheet from '../components/BottomSheet';

const SurahPage = () => {
  const { data } = useLoaderData();

  const [isActive, setIsActive] = useState(false);
  const [isTafsir, setIsTafsir] = useState(false);
  const [isTranslate, setIsTranslate] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [ayahId, setAyahId] = useState(null);

  const listRef = useRef(null);

  const scrollToIndex = (id) => {
    const listNode = listRef.current;
    const section = listNode.querySelectorAll('section')[id];
    section.scrollIntoView({
      behavior: 'smooth',
    });

    setSelectedOption(id);
  }

  const handleGetId = (id) => setAyahId(id);

  const handleSheet = () => setIsActive(!isActive);

  const handleTranslate = () => {
    setIsTranslate(!isTranslate);
    setIsActive(false);
  }

  const handleTafsir = () => {
    setIsTafsir(!isTafsir);
    setIsActive(false);
  }

  return (
    <main>
      <article>
        <header className="c-header bg-purple test">
          <h1 className="surah-name">
            <span>Surah</span>
            {data.name.transliteration.id}
          </h1>
          <div className="flex c-surah-item">
            <div className="surah-start">
              <p>
                {`${data.revelation.id} • ${data.numberOfVerses}`}
              </p>
              <p>
                {data.name.translation.id}
              </p>
            </div>
            <div className="surah-end">
              <span className="arabic text-xl">{data.name.short}</span>
            </div>
          </div>
        </header>
        <div className="flex-sb content">
          <ul className="c-breadcrumb">
            <li><Link to="/">Beranda</Link></li>
            <li>Surah</li>
          </ul>
          <div className="c-select">
            <label>
              Ayat
              <select 
                value={selectedOption}
                onChange={(e) => scrollToIndex(e.target.value)}
                className="select"
              >
                { data.verses.map((ayah, id) => (
                  <option key={id} value={id}>
                    {ayah.number.inSurah}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        { !isTafsir ? (
          <div className="c-ayah-list" ref={listRef}>
            { data.verses.map((ayah, id) => (
              <AyahListing 
                key={id}
                ayah={ayah} 
                isTranslate={isTranslate}
                onGetId={handleGetId}
                onShowSheet={handleSheet}
              />
            )) }
          </div>

        ) : (
          <div className="c-ayah-tafsir">
            <span onClick={handleTafsir}>
              Close
            </span>
            <section className="content">
              <h2>Tafsir Ayat</h2>
              <p>{data.verses[ayahId].tafsir.id.short}</p>
            </section>
          </div>
        )}
      </article>

      <BottomSheet 
        isActive={isActive} 
        isTranslate={isTranslate}
        onToggleTranslate={handleTranslate}
        onToggleTafsir={handleTafsir}
        onCloseSheet={handleSheet}
      />
    </main>
  )
}

const surahLoader = async ({ params }) => {
  const response = await fetch(`https://api.quran.gading.dev/surah/${params.num}`);
  const result = await response.json()
  return result;
}

export { SurahPage as default, surahLoader };
