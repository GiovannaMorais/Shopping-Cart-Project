const fetchItem = () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/items/MLB1341706310';
  const promise = fetch(url)
    .then((response) => response.json())
    .then((results) => results)
    .catch((error) => error);
  return promise;
};
// console.log(fetchItem())

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
