require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('1 - Teste se fetchProducts é uma função',()=>{
    expect(typeof fetchProducts).toBe('function')
  })
  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada',async () =>{
    const arg = await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })
  it('3 - Teste se e, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint',async ()=>{
    const arg = await fetchProducts ('computador')
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  expect(fetch).toHaveBeenCalledWith(url);
  })
  it('4 -  Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch',async ()=>{
    const arg = await fetchProducts ('computador')
  expect(arg).toBe(computadorSearch);
  })
  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url',async ()=>{
    const arg = await fetchProducts ()
  expect(arg).toEqual(new Error('You must provide an url'));
  })
});
