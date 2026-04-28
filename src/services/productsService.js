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
  const newProduct = await create(productData);
  return newProduct;
}

export async function updateProduct(id, updatedData) {
  try{const updatedProduct = await update(id, updatedData);
  if (updatedProduct) return updatedProduct;
  else {
    const error = new Error(`Product ${id} not found`);
    error.status = 404;
    throw error;
  }
}
  catch (error) {
    // This handles P2003 (Category not found) bubbling up from the database
    if (error.code === 'P2003') {
      const err = new Error(`Category ID ${updatedData.categoryId} not found`);
      err.status = 404; 
      throw err;
    }
    
    // Always re-throw anything else!
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
