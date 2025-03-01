// Helper function to truncate string
export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

// localStorage.ts
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.error('Could not save state', err)
  }
}

export const loadState = () => {``
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Could not load state', err)
    return undefined
  }
}
