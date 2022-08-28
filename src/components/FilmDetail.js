import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './FilmDetail.css'
import { TMDB_API_KEY } from '../TMDB.js'

function FilmDetail(props) {
  const [filmDetail, setFilmDetail] = useState({})

  const params = useParams()
  const filmID = params.filmID

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${filmID}?api_key=${TMDB_API_KEY}`
    fetch(url)
      .then((response) => response.json())
      .then((flmDetail) => {
        setFilmDetail(flmDetail)
      })
  }, [filmID])

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={
            filmDetail?.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280/${filmDetail?.backdrop_path}`
              : null
          }
          alt={`${filmDetail.title}  backdrop`}
        />
        <h1 className="film-title">{filmDetail.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={
              filmDetail?.poster_path
                ? `https://image.tmdb.org/t/p/w780/${filmDetail?.poster_path}`
                : null
            }
            className="film-detail-poster"
            alt={`${filmDetail.title}  poster`}
          />
          TAGELINE:{filmDetail.tagline}
          <br></br>
          OVERVIEW:{filmDetail.overview}
        </p>
      </div>
    </div>
  )

  // if (!props.showDetailPlainText)
  // return (
  //   <div className="FilmDetail is-hydrated">
  //     <figure className="film-backdrop">
  //       <img
  //         src={
  //           props.selectedFilm?.backdrop_path
  //             ? `https://image.tmdb.org/t/p/w1280/${props.selectedFilm?.backdrop_path}`
  //             : null
  //         }
  //         alt={`${props.selectedFilm.title}  backdrop`}
  //       />
  //       <h1 className="film-title">{props.selectedFilm.title}</h1>
  //     </figure>

  //     <div className="film-meta">
  //       <p className="film-detail-overview">
  //         <img
  //           src={
  //             props.selectedFilm?.poster_path
  //               ? `https://image.tmdb.org/t/p/w780/${props.selectedFilm?.poster_path}`
  //               : null
  //           }
  //           className="film-detail-poster"
  //           alt={`${props.selectedFilm.title}  poster`}
  //         />
  //         TAGELINE:{props.selectedFilm.tagline}
  //         <br></br>
  //         OVERVIEW:{props.selectedFilm.overview}
  //       </p>
  //     </div>
  //   </div>
  // )
  // else {
  //   console.log('should show plain text')
  //   return (
  // <div className="FilmDetail is-hydrated">
  //   <p className="plainTxt">No Faverites </p>
  //   <p>Please select form "ALL"</p>
  // </div>
  //   )
  // }
}

export default FilmDetail
