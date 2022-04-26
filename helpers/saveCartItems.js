const saveCartItems = (product) => 
  // seu código aqui
  localStorage.setItem('cartItems', product);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
