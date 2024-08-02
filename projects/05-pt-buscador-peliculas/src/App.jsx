import { useState, useEffect } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  //! Handle forms in a uncontrolled way (From the DOM)
  const handleSubmit = (event) => {
    event.preventDefault() //* Prevent the default behavior of the form
    // //* Get the form data using FormData
    // const fields = Object.fromEntries(
    //   new window.FormData(event.target)
    // )
    // console.log(fields)

    // //* Get the query field
    // const { query } = Object.fromEntries(
    //   new window.FormData(event.target)
    // )
    // console.log(query)
    console.log({ query })
  }

  //! Handle forms in a controlled way (From the React state)
  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    setQuery(event.target.value)
  }

  //! Using controlled way, we can validate the input on every change
  useEffect(() => {
    if (query === '') {
      setError('It cannot be empty')
      return
    }

    if (query.length < 3) {
      setError('It must have at least 3 characters')
      return
    }

    if (query.match(/\d+/)) {
      setError('It must not contain numbers')
      return
    }

    setError(null)
  }, [query])

  return (
    <div className='page'>
      <h1>Movie searcher</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          {/* Uncontrolled way */}
          {/* <input name='query' placeholder='Spiderman, Avengers, Deadpool...' /> */}

          {/* Controlled way */}
          <input onChange={handleChange} value={query} name='query' placeholder='Spiderman, Avengers, Deadpool...' />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
