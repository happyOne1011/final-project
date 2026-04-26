import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/productsRepo.js';

export async function getAllProducts() {
  return getAll();
}

export async function getProductById(id) {
  const product = await getById(id);
  if (product) return product;
  else {
    const error = new Error(`Product ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createProduct(productData) {
  return create(productData);
}

export async function updateProduct(id, updatedData) {
  const updatedProduct = await update(id, updatedData);
  if (updatedProduct) return updatedProduct;
  else {
    const error = new Error(`Product ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteProduct(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Product ${id} not found`);
    error.status = 404;
    throw error;
  }
}
