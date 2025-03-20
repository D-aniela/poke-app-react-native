import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

import { fetchPokemonDetail } from '../services/pokemonApi'
import { TPoke } from '../types/types'

const DetailPokemon = () => {
  const [pokemon, setPokemon] = useState<TPoke>({
    id: 0,
    height: 0,
    weight: 0,
    name: '',
    types: [{ type: { name: '' } }],
    sprites: { front_default: '' },
    abilities: [{ ability: { name: '', url: '' }, is_hidden: true, slot: 0 }],
  })
  const { id } = useLocalSearchParams()
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

  useEffect(() => {
    const loadPokemon = async () => {
      const detail = await fetchPokemonDetail(url)
      setPokemon(detail)
    }
    loadPokemon()
  }, [])

  console.log(pokemon)

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.pokemonImage}
          />
          <Text style={styles.name}>
            #{pokemon.id} {pokemon.name}
          </Text>
          <View style={styles.typeContainer}>
            {pokemon.types.map((t, index) => (
              <Text key={index} style={styles.type}>
                {t.type.name}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {/* <Text style={styles.description}>{pokemon.description}</Text> */}
          <Text style={styles.sectionTitle}>Pokédex Data</Text>
          {/* <Text>Species: {pokemon.pokedexData.species}</Text> */}
          <Text>Height: {pokemon.height}</Text>
          <Text>Weight: {pokemon.weight}</Text>
          <Text>Abilities: {pokemon.abilities.join(', ')}</Text>
          {/* <Text>Weaknesses: {pokemon.pokedexData.weaknesses.join(', ')}</Text> */}

          {/* <Text style={styles.sectionTitle}>Training</Text> */}
          {/* <Text>EV Yield: {pokemon.training.evYield}</Text> */}
          {/* <Text>Catch Rate: {pokemon.training.catchRate}</Text> */}
          {/* <Text>Base Friendship: {pokemon.training.baseFriendship}</Text> */}
          {/* <Text>Base Exp: {pokemon.training.baseExp}</Text> */}
          {/* <Text>Growth Rate: {pokemon.training.growthRate}</Text> */}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A7DB8D' },
  header: { alignItems: 'center', padding: 20 },
  pokemonImage: { width: 150, height: 150 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  typeContainer: { flexDirection: 'row', marginTop: 10 },
  type: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  description: { fontSize: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
})

export default DetailPokemon
