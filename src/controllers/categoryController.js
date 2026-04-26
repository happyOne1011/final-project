import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js';

export async function getAllCategoryHandler(req, res) {
  let Categories = await getAllCategories();
  res.status(200).json(Categories);
}

export async function getCategoryByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const Category = await getCategoryById(id);
  res.status(200).json(Category);
}

export async function createCategoryHandler(req, res) {
  const { name} = req.body;
  const newCategory = await createCategory({ name });
  res.status(201).json(newCategory);
}

export async function updateCategoryHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const updatedCategory = await updateCategory(id, { name});
  res.status(200).json(updatedCategory);
}

export async function deleteCategoryHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteCategory(id);
  res.status(204).send();
}
