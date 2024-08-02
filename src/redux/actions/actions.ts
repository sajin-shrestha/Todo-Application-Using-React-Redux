export const Add = (items: string) => {
  return {
    type: 'ADD_DATA',
    payload: items,
  }
}

export const Remove = (id: number) => {
  return {
    type: 'REMOVE_DATA',
    payload: id,
  }
}

export const Update = (items: string, id: number) => {
  return {
    type: 'UPDATE_DATA',
    payload: items,
    index: id,
  }
}
