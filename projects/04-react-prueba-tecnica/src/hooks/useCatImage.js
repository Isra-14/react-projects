import { useState, useEffect } from 'react'
import { getImageURLFromFirstWord } from '../services/facts'

//* Custom hook
//! Always start the name of a custom hook with "use"
//! Custom hooks can use other hooks
// Custom hooks can be used to separate logic from the components
export function useCatImage ({ fact }) {
  const [image, setImage] = useState()

  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ')[0]
    setImage(getImageURLFromFirstWord(firstWord))
  }, [fact])

  return { image }
}
