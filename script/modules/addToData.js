import { getTotalPrice } from "./getTotalPrice.js";
import { products } from "../../data.js";

export const addProductToData = (product) => {
  products.push({
    id: 0,
    title: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    discont: product.discont,
    count: product.count,
    units: product.units,
    images: {},
  });
  getTotalPrice(products);
};
