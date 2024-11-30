import { IoMdMore } from 'react-icons/io';

const style = {
  fontSize: '1.5rem',
}

const AyahListing = ({ ayah, isShowTranslate, onGetId, onShowSheet}) => {
  const ayahId = ayah.number.inSurah -1;

  const handleClick = () => {
    onGetId(ayahId)
    onShowSheet(true)
  }

  return (
    <>
      <section className="content c-ayah-item">
        <div className="ayah-outer">
          <span 
            onClick={handleClick}
            className="ayah-menu"
          >
            <IoMdMore style={style} />
          </span>
          <p className="ayah-arabic">{ayah.text.arab}
            <span>{ayah.number.inSurah}</span>
          </p>
        </div>
        { !isShowTranslate && (
          <p className="ayah-trans">
            {ayah.translation.id}
          </p>
        )}
      </section>
    </>
  )
}

export default AyahListing;
