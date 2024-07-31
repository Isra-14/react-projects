import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true` //! DEPRECATED
const CAT_ENDPOINT_IMAGE_PREFIX = 'https://cataas.com/cat/says/'
const CAT_ENDPOINT_IMAGE_CONFIG = '?fontSize=50&fontColor=red'

export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  //* Get a random fact about cats
  useEffect(() => {
    //* Fetch using async/await
    // async function getRandomFact () {
    //   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    //   const json = await res.json()
    //   setFact(json.fact)
    // }

    // getRandomFact()

    //* Fetch using promises
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        // const firstWord = fact.split(' ')[0]
        // console.log(firstWord)

        // fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
        //   .then(res => res.json())
        //   .then(data => {
        //     console.log(data)
        //   })
        // setImage(firstWord)
      })
  }, []) // <-- Render only once since the dependency array is empty

  //* Get image every time the fact changes
  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ')[0]
    // console.log(firstWord)

    setImage(firstWord)
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>} {/* <-- conditional render */}
        {image && <img src={`${CAT_ENDPOINT_IMAGE_PREFIX}${image}${CAT_ENDPOINT_IMAGE_CONFIG}`} alt={`Image extracted using the first word of the fact: ${fact}`} />}
      </section>
    </main>
  )
}
