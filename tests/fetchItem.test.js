require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('1 - Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('2 - Teste se a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    const arg = fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  })
  it('3 - Teste se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', async () =>{
    const arg = fetchItem("MLB1615760527");
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () =>{
    const arg =  await fetchItem("MLB1615760527");
    expect(arg).toBe(item);
  })
  it("5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url", async () => {
    const arg =  await fetchItem();
    expect(arg).toEqual(new Error("You must provide an url"));
  });

});
