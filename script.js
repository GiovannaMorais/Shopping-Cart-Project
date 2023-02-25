const saveCartItems = require('./helpers/saveCartItems');
const getSavedCartItems = require('./helpers/getSavedCartItems');

const cartItems = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
const esvaziar = document.querySelector('.empty-cart');
const sectionItems = document.querySelector('.items');

const somarTotal = () => { 
  let subtotal = 0;
  const salvar = getSavedCartItems();  
 
  const teste = salvar.split('$');
  teste.shift();
  teste.forEach((item) => { 
    subtotal += parseFloat(item);
  });
  total.innerHTML = subtotal;
};

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
  console.log(event.target);

  event.target.remove();

saveCartItems(cartItems.innerHTML);
somarTotal();
}
cartItems.addEventListener('click', cartItemClickListener);

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }
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

const listaProdutos = async (item) => {
  loading();
  const items = await fetchProducts(item);
  items.results.forEach((produto) =>
    sectionItems.appendChild(createProductItemElement(produto)));
    unloading();
};

const esvaziarCarrinho = () => {
 saveCartItems(cartItems.innerHTML = '');
 somarTotal();
};
esvaziar.addEventListener('click', esvaziarCarrinho);
window.onload = async () => {
  await listaProdutos('computador');
  cartItems.innerHTML = getSavedCartItems();
  somarTotal();
};
