import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <Link to="/films">to Films</Link>
    </div>
  )
}

export default HomePage
