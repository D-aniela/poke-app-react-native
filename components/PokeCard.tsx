import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import {
  capitalize,
  colorType,
  colorTypeBackground,
} from '@/app/utils/colorPicker'
import { fetchPokemonDetail } from '@/app/services/pokemonApi'
import { Link } from 'expo-router'
import { TPokeData, TPokePartial } from '@/app/types/types'

const PokemonCard = ({ data }: TPokeData) => {
  const [poke, setPoke] = useState<TPokePartial>({
    name: '',
    types: [{ type: { name: '' } }],
    sprites: { front_default: '' },
  })

  useEffect(() => {
    const loadPokemon = async () => {
      const detail = await fetchPokemonDetail(data.url)
      setPoke(detail)
    }
    loadPokemon()
  }, [data])

  return (
    <View
      key={poke.name}
      style={[
        styles.cardContainer,
        { backgroundColor: colorTypeBackground(poke.types[0].type.name) },
      ]}
    >
      {/* Sección de texto (número, nombre y tipos) */}
      <Link
        href={{
          pathname: '/details/[id]',
          params: { id: poke.name },
        }}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.pokemonNumber}>#001</Text>
          <Text style={styles.pokemonName}>{poke.name}</Text>
          <View style={styles.typeRow}>
            {poke.types &&
              poke.types.map((type) => (
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor: colorType(poke.types[0].type.name),
                    },
                  ]}
                >
                  <Text style={styles.typeText}>
                    {capitalize(type.type.name)}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </Link>
      {/* Sección de imagen */}
      {poke.sprites && (
        <Image
          style={styles.pokemonImage}
          source={{
            uri: `${poke.sprites.front_default}`,
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: { padding: 0 },
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
