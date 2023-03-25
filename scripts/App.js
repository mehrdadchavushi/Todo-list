const products = getProducts();

const filter = {
  searchItem: "",
  existItem: false,
  sortBy: "ByEdited",
};

document.querySelector("#search").addEventListener("input", (e) => {
  filter.searchItem = e.target.value;
  renderProduct(products, filter);
});

document.querySelector("#checkbox").addEventListener("change", (e) => {
  filter.existItem = e.target.checked;
  renderProduct(products, filter);
});

document.querySelector("#sort").addEventListener("change", (e) => {
  filter.sortBy = e.target.value;
  renderProduct(products, filter);
});

document.querySelector("#add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const timeStamp = moment().valueOf();
  products.push({
    title: e.target.elements.addProduct.value,
    price: e.target.elements.addPrice.value,
    exist: true,
    id: uuidv4(),
    updated: timeStamp,
    created: timeStamp,
  });
  saveProduct(products);
  renderProduct(products, filter);
  e.target.elements.addProduct.value = "";
  e.target.elements.addPrice.value = "";
});

renderProduct(products, filter);
