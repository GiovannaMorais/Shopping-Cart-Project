const cartItems = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
const esvaziar = document.querySelector('.empty-cart');
// const sectionCart = document.querySelector('.cart');
const sectionItems = document.querySelector('.items');

// na funçao somarTotal,primeiro declarei a subtotal iniciando com valor = 0
// chamei a função getSavedCartItems (que retorna o valor do item em string que está no local storage)
// usei o split para dividir a string ao chegar no $ ,retornando um array 
// usei o shift para deletar o primeiro item (que era o nome, o id do item e iria até o price) 
// pegando somente o numero
// fiz um forEach para dar um loop em todos os preços do array feito no split
// somando na variavel subtotal o preço do itemAtual que está no loop
// utilizei o parseFloat para converte a string em formato de numero em numeros reais

const somarTotal = () => { 
  let subtotal = 0;
  const salvar = getSavedCartItems();
  const teste = salvar.split('$');
  teste.shift();
  // console.log(teste.shift());
  teste.forEach((item) => { 
    subtotal += parseFloat(item);
  });
  // console.log(teste);
  total.innerHTML = subtotal
  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};
somarTotal();

// const subtrairTotal = (element) => { 
//     const subtotal = element - total;
//     const salvar = getSavedCartItems();
//     const teste = salvar.split('$');
//     teste.shift();
//     // console.log(teste.shift());
//     teste.reduce((acc, item) => acc - item, total);
//     // console.log(teste);
//     total.innerHTML = subtotal
//     .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
//   };
  
// subtrairTotal();

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
event.target.remove();
somarTotal();
// subtrairTotal(event.target);
}
cartItems.addEventListener('click', cartItemClickListener);

// peguei a função createProductItemElement coloquei um addEventListener no botao adicionar ao carinho
// e chamei a funçao adicionarProduct  onde chamei o obj fetchItem
// e appendiei o resultado da função createCartItemElement no carrinho de compras
// e dps retornei apendiei o botao na section da funçao createProductItemElement

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function adicionarProduct(product) {
  const result = await fetchItem(product);
  cartItems.appendChild(createCartItemElement(result));
  const productCart = cartItems.innerHTML;
  console.log(productCart);

  saveCartItems(productCart);
  somarTotal();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const test = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  test.addEventListener('click', () => {
    adicionarProduct(sku);
  });
  section.appendChild(test);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
const loading = () => {
  const load = document.createElement('span');
  load.classList = 'loading';
  load.innerText = 'carregando...';
  sectionItems.appendChild(load);
};
const unloading = () => {
  const unload = document.querySelector('.loading');
  sectionItems.removeChild(unload);
};

// Peguei o obj pelo items da função fetchProducts
// usei o forEach para percorrer todos os produtos
// e appendei na section .items todos os produtos que foram
// percorridos pelo forEach
// chamei a funçao no window.onload com o item que estou procurando
// que no caso seria o computador

const listaProdutos = async (item) => {
  loading();
  const items = await fetchProducts(item);
  // console.log(items);
  // const sectionItems = document.querySelector('.items');
  items.results.forEach((produto) =>
    sectionItems.appendChild(createProductItemElement(produto)));
    unloading();
};

// const pagRecarregar = () => {
//   cartItems.innerHTML = getSavedCartItems();
// };

const esvaziarCarrinho = () => {
//  cartItems.innerHTML = '';
 saveCartItems(cartItems.innerHTML = '');
 somarTotal();
};
esvaziar.addEventListener('click', esvaziarCarrinho);
window.onload = () => {
  listaProdutos('computador');
  cartItems.innerHTML = getSavedCartItems();
  somarTotal();
};
