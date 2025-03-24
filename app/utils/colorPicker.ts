export function iconType(type: string) {
  switch (type) {
    case 'bug':
      return require('./../../assets/pokeTypes/Bug.png')
    case 'dark':
      return require('./../../assets/pokeTypes/Dark.png')
    case 'dragon':
      return require('./../../assets/pokeTypes/Dragon.png')
    case 'electric':
      return require('./../../assets/pokeTypes/Electric.png')
    case 'flying':
      return require('./../../assets/pokeTypes/Flying.png')
    case 'fire':
      return require('./../../assets/pokeTypes/Fire.png')
    case 'fighting':
      return require('./../../assets/pokeTypes/Fighting.png')
    case 'fairy':
      return require('./../../assets/pokeTypes/Fairy.png')
    case 'ghost':
      return require('./../../assets/pokeTypes/Ghost.png')
    case 'grass':
      return require('./../../assets/pokeTypes/Grass.png')
    case 'ground':
      return require('./../../assets/pokeTypes/Ground.png')
    case 'ice':
      return require('./../../assets/pokeTypes/Ice.png')
    case 'normal':
      return require('./../../assets/pokeTypes/Normal.png')
    case 'poison':
      return require('./../../assets/pokeTypes/Poison.png')
    case 'psychic':
      return require('./../../assets/pokeTypes/Psychic.png')
    case 'rock':
      return require('./../../assets/pokeTypes/Rock.png')
    case 'steel':
      return require('./../../assets/pokeTypes/Steel.png')
    case 'water':
      return require('./../../assets/pokeTypes/Water.png')
    default:
      return require('./../../assets/pokeTypes/Bug.png')
  }
}

export function colorType(type: string) {
  switch (type) {
    case 'bug':
      return '#8CB230'
    case 'dark':
      return '#58575F'
    case 'dragon':
      return '#0f6AC0'
    case 'electric':
      return '#EED535'
    case 'flying':
      return '#748FC9'
    case 'fire':
      return '#FD7D24'
    case 'fighting':
      return '#D04164'
    case 'fairy':
      return '#ED6EC7'
    case 'ghost':
      return '#556AAE'
    case 'grass':
      return '#62B957'
    case 'ground':
      return '#DD7748'
    case 'ice':
      return '#61CEC0'
    case 'normal':
      return '#9DA0AA'
    case 'poison':
      return '#A552CC'
    case 'psychic':
      return '#EA5D60'
    case 'rock':
      return '#BAAB82'
    case 'steel':
      return '#417D9A'
    case 'water':
      return '#4A90DA'
    default:
      return '#88D674'
  }
}

export function colorTypeBackground(type: string) {
  switch (type) {
    case 'bug':
      return '#88D674'
    case 'dark':
      return '#6F6E78'
    case 'dragon':
      return '#7383B9'
    case 'electric':
      return '#F2CB55'
    case 'flying':
      return '#83A2E3'
    case 'fire':
      return '#FFA756'
    case 'fighting':
      return '#EB4971'
    case 'fairy':
      return '#EBA8C3'
    case 'ghost':
      return '#8571BE'
    case 'grass':
      return '#8BBE8A'
    case 'ground':
      return '#F78551'
    case 'ice':
      return '#91D8DF'
    case 'normal':
      return '#B5B9C4'
    case 'poison':
      return '#9F6E97'
    case 'psychic':
      return '#FF6568'
    case 'rock':
      return '#D4C294'
    case 'steel':
      return '#4C91B2'
    case 'water':
      return '#58ABF6'
    default:
      return '#88D674'
  }
}

export function capitalize(s: string) {
  return s && String(s[0]).toUpperCase() + String(s).slice(1)
}

/**
 * Añade ceros a la izquierda de un número hasta alcanzar una longitud específica.
 * @param {number} num - El número que se desea formatear.
 * @param {number} len - La longitud total deseada de la cadena resultante.
 * @returns {string} - El número formateado como cadena con ceros a la izquierda.
 */
export function addZeros(num: number, len: number) {
  return num.toString().padStart(len, '0')
}
