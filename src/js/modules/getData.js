export const getData = () => {
  return fetch('./src/data/data.json').then(data => data.json())
}
