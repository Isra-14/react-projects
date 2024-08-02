import { useState, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceMovies = useCallback(
    debounce(search => {
      // console.log('Debounce')
      getMovies({ search })
    }, 300) // 300ms
    , [getMovies])

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(newQuery)
    debounceMovies(newQuery)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log({ search })
    getMovies({ search })
  }

  const handleClick = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <h1>Movie searcher</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
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
          <input type='checkbox' name='sort' onClick={handleClick} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
