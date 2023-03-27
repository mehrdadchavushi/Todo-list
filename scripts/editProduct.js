const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector("#product-price");
const removeButton = document.querySelector("#remove-product");
const updatedItem = document.querySelector("#last-edit");
const ID = location.hash.substring(1);

let products = getProducts();

let product = products.find((item) => item.id === ID);

if (!product) {
  location.assign("/index.html");
}

productTitle.value = product.title;
productPrice.value = product.price;
updatedItem.textContent = `last updated: ${moment(product.updated).fromNow()}`;

productTitle.addEventListener("input", (e) => {
  product.title = e.target.value;
  product.updated = moment().valueOf();
  updatedItem.textContent = `last updated: ${moment(
    product.updated
  ).fromNow()}`;
  saveProduct(products);
});

productPrice.addEventListener("input", (e) => {
  product.price = e.target.value;
  product.updated = moment().valueOf();
  updatedItem.textContent = `last updated: ${moment(
    product.updated
  ).fromNow()}`;
  saveProduct(products);
});

removeButton.addEventListener("click", () => {
  removeProduct(ID);
  saveProduct(products);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key == "products") {
    products = JSON.parse(e.newValue);
    product = products.find((item) => item.id == ID);
    console.log(product);
    if (!product) {
      location.assign("/index.html");
    }
    productTitle.value = product.title;
    productPrice.value = product.price;
  }
});
