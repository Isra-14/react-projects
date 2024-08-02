import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  const lastSearch = useRef(search)

  //! Use memo to render only when the search changes
  // const getMovies = useMemo(() => {
  //   return async () => {
  //     if (search === lastSearch.current) return

  //     try {
  //       setLoading(true)
  //       setError(null)
  //       lastSearch.current = search
  //       const newMovies = await searchMovies({ search })
  //       setMovies(newMovies)
  //     } catch (e) {
  //       setError(e.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // }, [search])

  //! Use memo and set parameter to create function only once (Performance)
  // const getMovies = useMemo(() => {
  //   return async ({ search }) => {
  //     if (search === lastSearch.current) return

  //     try {
  //       setLoading(true)
  //       setError(null)
  //       lastSearch.current = search
  //       const newMovies = await searchMovies({ search })
  //       setMovies(newMovies)
  //     } catch (e) {
  //       setError(e.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // }, [])

  //! useMemo VS useCallback
  //* useCallback is used to memoize functions (use useMemo itself)
  //* useMemo is used to memoize values
  const getMovies = useCallback(
    async ({ search }) => {
      if (search === lastSearch.current) return

      try {
        setLoading(true)
        setError(null)
        lastSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }, [])

  const sortedMovies = useMemo(() => {
    // console.log('Memo sorting movies')

    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, loading }
}
