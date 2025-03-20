import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { fetchPokemonDetail } from '@/app/services/pokemonApi'

const capitalize = (s: string) =>
  s && String(s[0]).toUpperCase() + String(s).slice(1)

function colorAPastel(colorName) {
  // Crear un elemento temporal para obtener el color RGB del nombre
  const tempElement = document.createElement('div')
  tempElement.style.color = colorName
  document.body.appendChild(tempElement)

  // Obtener el color computado en formato RGB
  const rgbColor = window.getComputedStyle(tempElement).color
  document.body.removeChild(tempElement)

  // Extraer los valores R, G y B del color
  const rgbValues = rgbColor.match(/\d+/g).map(Number)

  // Función para convertir un valor RGB a su representación hexadecimal
  const componentToHex = (c) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  // Mezclar el color con blanco para obtener el tono pastel
  const pastelFactor = 0.7 // Ajusta este factor para obtener tonos más o menos claros
  const pastelRGB = rgbValues.map((value) =>
    Math.round((1 - pastelFactor) * 255 + pastelFactor * value)
  )

  // Convertir el color pastel a formato hexadecimal
  const pastelHex =
    '#' +
    componentToHex(pastelRGB[0]) +
    componentToHex(pastelRGB[1]) +
    componentToHex(pastelRGB[2])

  return pastelHex
}

export type TPoke = {
  name: string
  types: [{ type: { name: string } }]
  sprites: { front_default: string }
}

export type TPokeColor = { color: { name: string } }

const PokemonCard = ({ data }) => {
  const [poke, setPoke] = useState<TPoke>({
    name: '',
    types: [{ type: { name: '' } }],
    sprites: { front_default: '' },
  })
  const [pokeColor, setPokeColor] = useState<TPokeColor>({
    color: { name: '' },
  })

  useEffect(() => {
    const loadPokemon = async () => {
      const detail = await fetchPokemonDetail(data.url)
      setPoke(detail)
    }
    loadPokemon()

    const loadPokemonColor = async () => {
      const detail = await fetchPokemonDetail(
        `https://pokeapi.co/api/v2/pokemon-species/${data.name}/`
      )
      setPokeColor(detail)
    }
    loadPokemonColor()
  }, [data])
  console.log(pokeColor.color.name)

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: colorAPastel(pokeColor.color.name) },
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
                  { backgroundColor: pokeColor.color.name },
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
