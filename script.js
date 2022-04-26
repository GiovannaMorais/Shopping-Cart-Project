const cartItems = document.querySelector('.cart__items');

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
  saveCartItems(productCart);
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

// Peguei o obj pelo items da função fetchProducts
// usei o forEach para percorrer todos os produtos
// e appendei na section .items todos os produtos que foram
// percorridos pelo forEach
// chamei a funçao no window.onload com o item que estou procurando
// que no caso seria o computador

const listaProdutos = async (item) => {
  const items = await fetchProducts(item);
  // console.log(items);
  const sectionItems = document.querySelector('.items');
  items.results.forEach((produto) =>
    sectionItems.appendChild(createProductItemElement(produto)));
};

const pagRecarregar = () => {
 cartItems.innerHTML = getSavedCartItems();
};

window.onload = () => {
  listaProdutos('computador');
  pagRecarregar();
};
