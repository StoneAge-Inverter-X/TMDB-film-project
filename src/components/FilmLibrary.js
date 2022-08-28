import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'

import FilmItem from './FilmItem'
import FaveItem from './FaveItem.js'
import { TMDB_API_KEY } from '../TMDB.js'

import './FilmLibrary.css'
import './FilmItem.css'

function FilmLibrary() {
  const [filmItems, setFilmItems] = useState([])
  const [faveItems, setFaveItems] = useState([])
  const [selectedFilm, setSelectedFilm] = useState({})
  const [isShowAll, setIsShowAll] = useState(true)
  const [showDetailPlainText, setShowDetailPlainText] = useState(false)

  const [page, setPage] = useState(1)
  const [year, setYear] = useState(2022)
  const prevYear = useRef(0)

  // useEffect to fetch data from API
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&primary_release_year=${year}`
    fetch(url)
      .then((response) => response.json())
      .then((filmListData) => {
        if (prevYear.current === year) {
          //add to current array
          setFilmItems((prevFilmItems) => [
            ...prevFilmItems,
            ...filmListData.results,
          ])
        } else {
          //start a new array
          setFilmItems([...filmListData.results])
          setPage(1)
        }
        prevYear.current = year
        //return a promise for the following then
        return filmListData.results[0].id
      })
      .then((id) => {
        //TAGELINE is not in filmListData.this is to fetch the film detail,which inludes tageline
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
        fetch(url)
          .then((response) => response.json())
          .then((filmDetail) => setSelectedFilm(filmDetail))
      })
  }, [page, year])

  //handle the event when 'ALL' tab is clicked
  const handleSwitchAllOn = () => {
    setIsShowAll(true)
    if (filmItems.length > 0) setSelectedFilm({ ...filmItems[0] })
    showDetailPlainText && setShowDetailPlainText(false)
  }

  //handle the event when 'Faves' tab is clicked
  const handleSwitchAllOff = () => {
    setIsShowAll(false)
    if (faveItems.length > 0) setSelectedFilm({ ...faveItems[0] })
    faveItems.length === 0 && setShowDetailPlainText(true)
  }

  const handleInputChange = (e) => {
    const inputYear = Number(e.target.value)
    inputYear <= 2022 && inputYear > 1960 && setYear(inputYear)
    inputYear <= 2022 && inputYear > 1960 && setPage(1)
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <input
            onChange={handleInputChange}
            onClick={(e) => (e.target.value = '')}
            display="block"
            defaultValue="please type a year"
          ></input>

          <button
            className={
              isShowAll ? 'film-list-filter is-active' : 'film-list-filter'
            }
            onClick={handleSwitchAllOn}
          >
            ALL
            <span className="section-count">{filmItems.length}</span>
          </button>
          <button
            className={
              isShowAll ? 'film-list-filter ' : 'film-list-filter is-active'
            }
            onClick={handleSwitchAllOff}
          >
            FAVES
            <span className="section-count">{faveItems.length}</span>
          </button>
        </div>

        {isShowAll
          ? filmItems.map((filmItem, i) => {
              return (
                <FilmItem
                  key={filmItem.id}
                  film={filmItem}
                  setSelectedFilm={setSelectedFilm}
                  faveItems={faveItems}
                  setFaveItems={setFaveItems}
                  setShowDetailPlainText={setShowDetailPlainText}
                />
              )
            })
          : faveItems.map((filmItem, i, curentArray) => {
              if (curentArray.length > 0)
                return (
                  <FaveItem
                    key={filmItem.id}
                    film={filmItem}
                    setSelectedFilm={setSelectedFilm}
                    faveItems={faveItems}
                    setFaveItems={setFaveItems}
                    setShowDetailPlainText={setShowDetailPlainText}
                  />
                )
              else {
                return <p>no favorate, please add some</p>
              }
            })}

        {isShowAll ? (
          <button onClick={() => setPage(page + 1)}>Load More</button>
        ) : null}
      </div>

      {/* <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail
          selectedFilm={selectedFilm}
          showDetailPlainText={showDetailPlainText}
        />
      </div> */}

      <Outlet />
    </div>
  )
}

export default FilmLibrary
