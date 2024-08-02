import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  //! Using controlled way, we can validate the input on every change
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('It cannot be empty')
      return
    }

    if (search.length < 3) {
      setError('It must have at least 3 characters')
      return
    }

    if (search.match(/\d+/)) {
      setError('It must not contain numbers')
      return
    }

    setError(null)
  }, [search])

  return { search, error, updateSearch }
}
