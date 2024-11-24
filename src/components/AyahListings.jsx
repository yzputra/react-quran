import { forwardRef } from 'react';
import AyahListing from '../components/AyahListing';

const AyahListings = forwardRef(({ surah, isTranslate, getId, onShow}, ref) => {
  return (
    <div className="c-ayah-list" ref={ref}>
      { surah.verses.map((ayah, id) => (
        <AyahListing 
          key={id}
          ayah={ayah} 
          isTranslate={isTranslate}
          getId={getId}
          onShow={onShow}
        />
      )) }
    </div>
  )
})

export default AyahListings;
