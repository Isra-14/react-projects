//! Al separar la logica, evita pasar las dependencias propias de React

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true` //! DEPRECATED
const CAT_ENDPOINT_IMAGE_PREFIX = 'https://cataas.com/cat/says/'
const CAT_ENDPOINT_IMAGE_CONFIG = '?fontSize=50&fontColor=red'

export const getRandomFact = async () => {
  // ❌ No se puede usar hooks
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  return fact
}

//! DEPRECATED Since the json doesn't return the image URL
export const getImageURL = async (firstWord) => {
  const res = await fetch(`${CAT_ENDPOINT_IMAGE_PREFIX}${firstWord}?fontSize=50&fontColor=red&json=true`)
  const data = await res.json()
  const { url } = data
  return url
}

export const getImageURLFromFirstWord = (firstWord) => {
  const url = `${CAT_ENDPOINT_IMAGE_PREFIX}${firstWord}${CAT_ENDPOINT_IMAGE_CONFIG}`
  return url
}
