import { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import Select from '../components/Select';
import AyahListing from '../components/AyahListing';
import BottomSheet from '../components/BottomSheet';
import AudioPlayer from '../components/AudioPlayer';

import useIndexScroll from '../hooks/useIndexScroll';
import useToggle from '../hooks/useToggle';

const SurahPage = () => {
  const { data } = useLoaderData();
  const { value, listRef, scrollToIndex } = useIndexScroll();

  const [isOpen, setIsOpen] = useState(false);
  const [isShowTafsir, toggleTafsir] = useToggle(false);
  const [isShowTranslate, toggleTranslate] = useToggle(false);
  const [audioStatus, toggleAudioStatus] = useToggle(false);
  const [ayahId, setAyahId] = useState(0);

  const handleGetId = (id) => setAyahId(id);

  const handleSheet = (value) => setIsOpen(value);

  const handleToggleTafsir = () => {
    if (isShowTafsir) {
      scrollToIndex(ayahId);
    } else {
      window.scrollTo(50, 100);
    } 
    toggleTafsir()
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
          <Select 
            surah={data}
            value={value}
            onScrollToIndex={scrollToIndex}
          />
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
            <span onClick={handleToggleTafsir}>
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
          onToggleAudioStatus={toggleAudioStatus}
        />
      }

      <BottomSheet 
        isOpen={isOpen} 
        isShowTranslate={isShowTranslate}
        onToggleTranslate={toggleTranslate}
        onToggleTafsir={handleToggleTafsir}
        onToggleAudioStatus={toggleAudioStatus} 
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
