const fetchProducts = (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const promise = fetch(url)
    .then((response) => response.json())
    .then((results) => results)
    .catch((error) => error);
  return promise;
};
// console.log(fetchProducts());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
