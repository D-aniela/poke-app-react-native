export type TPoke = {
  id: number
  height: number
  weight: number
  name: string
  types: [{ type: { name: string } }]
  sprites: { front_default: string }
  abilities: [
    { ability: { name: string; url: string }; is_hidden: boolean; slot: number }
  ]
}

export type TPokeColor = { color: { name: string } }

export type TPokeData = {
  data: { name: string; url: string }
}

export type TPokePartial = Pick<TPoke, 'name' | 'types' | 'sprites'>
