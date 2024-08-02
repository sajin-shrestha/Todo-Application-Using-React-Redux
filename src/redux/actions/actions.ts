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
