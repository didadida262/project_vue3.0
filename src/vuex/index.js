class Store {
  // eslint-disable-next-line no-useless-constructor
  constructor (state) {
    this.state = state
  }

  install () {
    console.log('ok!!!!!!!!!!!!!!!')
  }
}

export function createStore () {
  return new Store({})
}

export function useStore () {
  console.log('ok')
}
