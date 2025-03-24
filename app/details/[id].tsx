import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

import { fetchPokemonDetail } from '../services/pokemonApi'
import { TPoke } from '../types/types'
import {
  addZeros,
  capitalize,
  colorType,
  colorTypeBackground,
  iconType,
} from '../utils/colorPicker'

const DetailPokemon = () => {
  const [pokemon, setPokemon] = useState<TPoke>({
    id: 0,
    height: 0,
    weight: 0,
    name: '',
    types: [{ type: { name: '' } }],
    sprites: {
      front_default: '',
      other: { 'official-artwork': { front_default: '' } },
    },
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
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: colorTypeBackground(pokemon.types[0].type.name) },
        ]}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: pokemon.sprites.other['official-artwork'].front_default,
            }}
            style={styles.pokemonImage}
          />
          <View style={styles.text}>
            <Text style={styles.textId}>#{addZeros(pokemon.id, 3)}</Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <View style={styles.types}>
              {pokemon.types.map((t, index) => (
                <Image source={iconType(t.type.name)} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  text: { flexDirection: 'column', marginLeft: 30 },
  textId: { color: '#17171B99', fontWeight: 'bold' },
  name: {
    flexDirection: 'column',
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  pokemonImage: { width: 125, height: 125 },
  types: { flexDirection: 'row' },
  type: { margin: 5 },
})

export default DetailPokemon
