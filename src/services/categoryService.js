import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/categoryRepo.js';

export async function getAllCategories() {
  return getAll();
}

export async function getCategoryById(id) {
  const categories = await getById(id);
  if (categories) return categories;
  else {
    const error = new Error(`Category ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createCategory(CategoryData) {
  const newCategory= await create(CategoryData);
  if (newCategory) return newCategory;
  else {
    const error = new Error(`Category Name: ${CategoryData.name} already exists`);
    error.status = 409;
    throw error;
  }
}

export async function updateCategory(id, updatedData) {
 try
 { 
  const updatedCategory = await update(id, updatedData);
  if (updatedCategory) return updatedCategory;
  else {
    const error = new Error(`Category ${id} not found`);
    error.status = 404;
    throw error;
  }
}
  catch(error){
    if(error.code === 'P2002')
    {
    const err = new Error(`Category Name: ${updatedData.name} already exists`);
    err.status =409;
    throw err;
    }

  }
}

export async function deleteCategory(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Category ${id} not found`);
    error.status = 404;
    throw error;
  }
}
