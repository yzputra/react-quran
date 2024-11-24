const SavedList = ({ isAyah = false }) => {
  return (
    <section class="content">
      <h2>{isAyah ? 'Ayat ditandai' : 'Surah disematkan'}</h2>
      <div class="alert-info bg-purple">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione architecto a cumque quis quibusda.</p>
        {isAyah ? (
          <a class="btn btn--primary" 
            src="#">
            Tambahkan
          </a> 
        ) : '' }
      </div>
    </section>
  )
}

export default SavedList;
