const fetchItem = (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  const promise = fetch(url)
    .then((response) => response.json())
    .then((results) => results)
    .catch((error) => error);
  return promise;
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
