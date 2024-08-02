import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
    getMovies()
  }

  return (
    <div className='page'>
      <h1>Movie searcher</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          {/* Uncontrolled way */}
          {/* <input name='query' placeholder='Spiderman, Avengers, Deadpool...' /> */}

          {/* Controlled way */}
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Spiderman, Avengers, Deadpool...'
          />
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
