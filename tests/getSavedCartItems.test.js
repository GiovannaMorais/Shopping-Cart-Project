const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('1 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado',()=>{
    const arg = getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  })
  it('2 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro',()=>{
    const arg = getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
