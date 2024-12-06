import { useState, useEffect } from 'react';
import SurahListing from '../components/SurahListing';

const SurahListings = ({ surah }) => {

  return (
    <>
      <div className="c-surah-list">
        {surah.map((surah, id) => (
          <SurahListing
            key={id}
            surah={surah}
          />
        ))}
      </div>
    </>
  )
}

export default SurahListings;
