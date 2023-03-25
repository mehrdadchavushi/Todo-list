const getProducts = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
};

const saveProduct = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const renderProduct = (products, filter) => {
  products = sortProducts(products, filter.sortBy);
  let filteredProducts = products.filter((item) => {
    return item.title.toLowerCase().includes(filter.searchItem.toLowerCase());
  });
  filteredProducts = filteredProducts.filter((item) => {
    return filter.existItem ? item.exist : true;
  });
  document.querySelector("#products").innerHTML = "";
  filteredProducts.forEach((item) => {
    document.querySelector("#products").appendChild(createProductDom(item));
  });
};

const sortProducts = (products, value) => {
  if (value === "byCreated") {
    return products.sort((a, b) => {
      if (a.created > b.created) {
        return 1;
      } else if (a.created < b.created) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  if (value === "byEdited") {
    return products.sort((a, b) => {
      if (a.updated > b.updated) {
        return 1;
      } else if (a.updated < b.updated) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    return products;
  }
};

const removeProduct = (id) => {
  const findIndex = products.findIndex((item) => item.id === id);
  if (findIndex > -1) {
    products.splice(findIndex, 1);
  }
};

const checkedProduct = (id) => {
  const checkedItem = products.find((item) => item.id == id);
  if (checkedItem) {
    checkedItem.exist = !checkedItem.exist;
  }
};

const createProductDom = (item) => {
  const productEl = document.createElement("div");
  const checkBox = document.createElement("input");
  const button = document.createElement("button");
  const title = document.createElement("a");
  const price = document.createElement("p");
  productEl.setAttribute("class", "product-row");

  checkBox.setAttribute("type", "checkbox");
  productEl.appendChild(checkBox);
  checkBox.checked = item.exist;
  checkBox.addEventListener("change", () => {
    checkedProduct(item.id);
    saveProduct(products);
    renderProduct(products, filter);
  });
  title.textContent = item.title;
  title.setAttribute("href", `/edit-product.html#${item.id}`);
  productEl.appendChild(title);

  price.textContent = `${item.price} تومان`;
  productEl.appendChild(price);

  button.textContent = "حذف";

  productEl.appendChild(button);

  button.addEventListener("click", () => {
    removeProduct(item.id);
    saveProduct(products);
    renderProduct(products, filter);
  });
  return productEl;
};
