import { Link } from 'react-router-dom'

import './FilmItem.css'

const FilmItem = ({
  film,
  faveItems,
  setFaveItems,
  setShowDetailPlainText,
  setSelectedFilm,
}) => {
  const { title, id, release_date, poster_path } = film
  const releaseDate = new Date(release_date)
  const releaseYear = releaseDate.getFullYear()

  const handleAddFave = () => {
    //if the film not exists in faveItems, then add it in
    if (!faveItems.some((item) => item.id === id)) {
      const newFaveList = [film, ...faveItems]
      setFaveItems(newFaveList)
      if (newFaveList.length > 0) setShowDetailPlainText(false)
    } else {
      //otherwise, remove it from faveItems
      const newFaveList = faveItems.filter((item) => item.id !== id)
      setFaveItems(newFaveList)
    }
  }

  // const handleClickFilmItem = () => {
  //   const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((filmDetail) => setSelectedFilm(filmDetail))
  // }

  return (
    <div className="FilmRow">
      <img
        src={`https://image.tmdb.org/t/p/w780${poster_path}`}
        alt={`${title} film poster`}
      />
      <div className="film-summary">
        <h3>{title}</h3>
        <p>{releaseYear}</p>
      </div>
      <button className="fave" onClick={handleAddFave}>
        <span className="material-icons">
          {faveItems.some((film) => film.id === id)
            ? 'remove_from_queue'
            : 'add_to_queue'}
        </span>
      </button>
      <Link to={`/films/${film.id}`} className="action">
        <span className="material-icons">read_more</span>
      </Link>
    </div>
  )
}

export default FilmItem
