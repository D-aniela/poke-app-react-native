import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { fetchPokemonDetail } from '@/app/services/pokemonApi'

const PokemonCard = ({ data }) => {
  const [poke, setPoke] = useState('')

  useEffect(() => {
    const loadPokemon = async () => {
      const detail = await fetchPokemonDetail(data.url)
      setPoke(detail)
    }
    loadPokemon()
  }, [data])
  console.log(poke.types.map((a) => a.type))

  return (
    <View style={styles.cardContainer}>
      {/* Sección de texto (número, nombre y tipos) */}
      <View style={styles.infoContainer}>
        <Text style={styles.pokemonNumber}>#001</Text>
        <Text style={styles.pokemonName}>{poke.name}</Text>
        <View style={styles.typeRow}>
          {poke.types.map((type) => (
            <View style={[styles.typeBadge, { backgroundColor: '#4caf50' }]}>
              <Text style={styles.typeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Sección de imagen */}
      <Image
        style={styles.pokemonImage}
        source={{
          uri: `${poke.sprites.front_default}`,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#A4D6A7', // tono verde claro
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    margin: 10,
  },
  infoContainer: {
    flex: 1,
  },
  pokemonNumber: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  typeText: {
    color: '#fff',
    fontWeight: '600',
  },
  pokemonImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
})

export default PokemonCard
