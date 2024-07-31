// import { useEffect, useState } from 'react'
import './App.css'
// import { getRandomFact } from './services/facts'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

// //* Custom hook
// //! Always start the name of a custom hook with "use"
// //! Custom hooks can use other hooks
// // Custom hooks can be used to separate logic from the components
// function useCatImage ({ fact }) {
//   const [image, setImage] = useState()

//   useEffect(() => {
//     if (!fact) return

//     const firstWord = fact.split(' ')[0]
//     setImage(getImageURLFromFirstWord(firstWord))
//   }, [fact])

//   return { image }
// }

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { image } = useCatImage({ fact })

  //* Get a random fact about cats
  // useEffect(() => {
  //   getRandomFact().then(newFact => setFact(newFact))
  // }, []) // <-- Render only once since the dependency array is empty

  // //* Get image every time the fact changes
  // useEffect(() => {
  //   if (!fact) return

  //   // const firstWord = fact.split(' ')[0]
  //   // console.log(firstWord)

  //   useCatImage({ fact })
  // }, [fact])

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>} {/* <-- conditional render */}
        {image && <img src={image} alt={`Image extracted using the first word of the fact: ${fact}`} />}
      </section>
    </main>
  )
}
