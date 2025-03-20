// src/services/pokemonApi.js
export const fetchPokemonList = async (limit = 151) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    )
    const data = await response.json()
    return data.results // Devuelve un array de objetos { name, url }
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error)
    throw error
  }
}

export const fetchPokemonDetail = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data // Devuelve el detalle completo del Pokémon
  } catch (error) {
    console.error('Error al obtener el detalle del Pokémon:', error)
    throw error
  }
}

export const fetchPokemonColor = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error al obtener el detalle del Pokémon:', error)
    throw error
  }
}
