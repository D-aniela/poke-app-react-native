import { Image, StyleSheet, StatusBar, Text } from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import PokemonCard from '@/components/PokeCard'
import { useEffect, useState } from 'react'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

export interface PokeAPIResponse {
  count: number
  next?: string
  previous?: string
  results: PokemonListItem[]
}
export interface PokemonListItem {
  name: string
  url: string
  sprites: any
}

export default function HomeScreen() {
  const [data, setData] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=151'
        )
        const data = await response.json()
        setData(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener Pokémon:', error)
        setLoading(false)
      }
    }

    getPokemons()
  }, [])

  if (loading) {
    return <Text>Cargando...</Text>
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          <Text
            style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}
          >
            Lista de Pokémon
          </Text>
          {/* <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={{ marginVertical: 5 }}>{item.name}</Text>
            )}
          /> */}
          <Text style={styles.baseText}>Pokédex</Text>
          {data.map((d) => (
            <PokemonCard data={d} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 30,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 42,
  },
})
