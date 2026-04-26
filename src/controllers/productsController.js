import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productsService.js';

export async function getAllProductsHandler(req, res) {
  let products = await getAllProducts();
  res.status(200).json(products);
}

export async function getProductByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const post = await getProductById(id);
  res.status(200).json(post);
}

export async function createProductHandler(req, res) {
  const { name, price, stock, categoryId } = req.body;
  const newProduct = await createProduct({ name, price, stock, categoryId });
  res.status(201).json(newProduct);
}

export async function updateProductHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, price, stock, categoryId } = req.body;
  const updatedPost = await updateProduct(id, { name, price, stock, categoryId });
  res.status(200).json(updatedPost);
}

export async function deleteProductHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteProduct(id);
  res.status(204).send();
}
