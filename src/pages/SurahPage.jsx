import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import AyahListing from '../components/AyahListing';
import BottomSheet from '../components/BottomSheet';
import AudioPlayer from '../components/AudioPlayer';
import useIndexScroll from '../hooks/useIndexScroll';

const SurahPage = () => {
  const { data } = useLoaderData();

  const [isOpen, setIsOpen] = useState(false);
  const [isShowTafsir, setIsShowTafsir] = useState(false);
  const [isShowTranslate, setIsShowTranslate] = useState(false);
  const [audioStatus, setAudioStatus] = useState(false);
  const [ayahId, setAyahId] = useState(0);
  
  const { value, listRef, scrollToIndex } = useIndexScroll();

  const handleGetId = (id) => setAyahId(id);

  const handleSheet = () => setIsOpen(!isOpen);

  const handleShowTranslate = () => {
    setIsShowTranslate(!isShowTranslate);
    setIsOpen(false);
  }

  const handleShowTafsir = () => {
    if (isShowTafsir) {
      setIsShowTafsir(false);
      scrollToIndex(ayahId);
    } else {
      setIsShowTafsir(true);
      window.scrollTo(50, 100);
    }

    setIsOpen(false);
  }

  const handleAudioStatus = (value) => {
    setAudioStatus(value)
    setIsOpen(false);
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
                value={value}
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

        { !isShowTafsir ? (
          <div className="c-ayah-list" ref={listRef}>
            { data.verses.map((ayah, id) => (
              <AyahListing 
                key={id}
                ayah={ayah} 
                isShowTranslate={isShowTranslate}
                onGetId={handleGetId}
                onShowSheet={handleSheet}
              />
            )) }
          </div>

        ) : (
          <div className="c-ayah-tafsir">
            <span onClick={handleShowTafsir}>
              Close
            </span>
            <section className="content">
              <h2>Tafsir Ayat</h2>
              <p>{data.verses[ayahId].tafsir.id.short}</p>
            </section>
          </div>
        )}
      </article>

      { audioStatus && 
        <AudioPlayer 
          surah={data}
          ayahId={ayahId}
          audioStatus={audioStatus}
          onToggleAudioStatus={handleAudioStatus}
        />
      }

      <BottomSheet 
        isOpen={isOpen} 
        isShowTranslate={isShowTranslate}
        onToggleTranslate={handleShowTranslate}
        onToggleTafsir={handleShowTafsir}
        onToggleAudioStatus={handleAudioStatus} 
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
