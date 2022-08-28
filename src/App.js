import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FilmDetail from './components/FilmDetail'
import FilmLibrary from './components/FilmLibrary'
import HomePage from './components/pages/HomePage'
import PageNotFound from './components/pages/PageNotFound.js'

function App() {
  // return <FilmLibrary />
  return (
    // <BrowserRouter>
    //   <Routes path="/films" element={<FilmLibrary />}></Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmLibrary />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="films" element={<FilmLibrary />}>
          <Route path=":filmID" element={<FilmDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
