export function Get_Storage(key: string) {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  }
  return
}
export function Save_Storage<T>(key: string, value: T) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
