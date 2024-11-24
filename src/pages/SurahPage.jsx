import { useState, useRef } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import AyahListings from '../components/AyahListings';
import BottomSheet from '../components/BottomSheet';
import Select from '../components/Select';

const SurahPage = () => {
  const { data } = useLoaderData();
  const listRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(1);


  const scrollToIndex = (id) => {
    const listNode = listRef.current;

    const sectionNode = listNode.querySelectorAll('section')[id-1];
    sectionNode.scrollIntoView({
      behavior: 'smooth',
    });

    setSelectedOption(id);
  }


  const [isActive, setIsActive] = useState('');
  const [isTafsir, setIsTafsir] = useState(false);
  const [isTranslate, setIsTranslate] = useState(false);
  const [ayahId, setAyahId] = useState(null);

  const handleGetId = (id) => setAyahId(id);

  const handleShow = () => setIsActive('active');

  const handleClose = () => setIsActive('');

  const handleTranslate = () => {
    setIsTranslate(!isTranslate);
    setIsActive('');
  }

  const handleTafsir = () => {
    setIsTafsir(!isTafsir);
    setIsActive('');
  }

  return (
    <main>
      <article>
        <header className="c-header bg-purple test">
          <h1 className="surah-name"><span>Surah</span>{data.name.transliteration.id}</h1>
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
            value={selectedOption}
            onScrollToIndex={scrollToIndex}
          />
        </div>

        { !isTafsir ? (
          <AyahListings
            ref={listRef}
            surah={data}
            isTranslate={isTranslate}
            getId={handleGetId}
            onShow={handleShow}
          />

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
        ) }

        <BottomSheet 
          isActive={isActive} 
          isTranslate={isTranslate}
          onToggleTranslate={handleTranslate}
          onToggleTafsir={handleTafsir}
          onClose={handleClose}
        />

      </article>
    </main>
  )
}

const surahLoader = async ({ params }) => {
  const response = await fetch(`https://api.quran.gading.dev/surah/${params.num}`);
  const result = await response.json()
  return result;
}

export { SurahPage as default, surahLoader };
