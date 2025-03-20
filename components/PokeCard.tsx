import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { colorType, colorTypeBackground } from '@/app/utils/colorPicker'
import { fetchPokemonDetail } from '@/app/services/pokemonApi'

const capitalize = (s: string) =>
  s && String(s[0]).toUpperCase() + String(s).slice(1)

export type TPoke = {
  name: string
  types: [{ type: { name: string } }]
  sprites: { front_default: string }
}

export type TPokeColor = { color: { name: string } }

export type TPokeData = {
  data: { name: string; url: string }
}

const PokemonCard = ({ data }: TPokeData) => {
  const [poke, setPoke] = useState<TPoke>({
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
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => console.log(`Pokemon pressed: ${poke.name}`)}
    >
      <View
        key={poke.name}
        style={[
          styles.cardContainer,
          { backgroundColor: colorTypeBackground(poke.types[0].type.name) },
        ]}
      >
        {/* Sección de texto (número, nombre y tipos) */}
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
    </TouchableOpacity>
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
