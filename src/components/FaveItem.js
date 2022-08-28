import './FilmItem.css'

const FaveItem = ({
  film,
  setSelectedFilm,
  faveItems,
  setShowDetailPlainText,
  setFaveItems,
}) => {
  const { poster_path, title, release_date } = film
  const releaseDate = new Date(release_date)
  const releaseYear = releaseDate.getFullYear()

  const handleRemoveFaveClick = () => {
    const newFaveList = faveItems.filter((fave) => fave.id !== film.id)
    setFaveItems(newFaveList)
    if (newFaveList.length > 0) {
      setSelectedFilm({ ...newFaveList[0] })
    }
    //set the detail to show plain text, if newFaveList is empty
    newFaveList.length === 0 && setShowDetailPlainText(true)
  }

  return (
    <div className="FilmRow">
      <img
        src={`https://image.tmdb.org/t/p/w780${poster_path}`}
        alt={`${title} film poster`}
        onClick={() => {
          setSelectedFilm(film)
        }}
      />
      <div
        className="film-summary"
        onClick={() => {
          setSelectedFilm(film)
        }}
      >
        <h3>{title}</h3>
        <p>{releaseYear}</p>
      </div>
      <button className="fave" onClick={handleRemoveFaveClick}>
        <span className="material-icons">'remove_from_queue'</span>
      </button>
    </div>
  )
}

export default FaveItem
