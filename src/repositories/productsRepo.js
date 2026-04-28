import prisma from '../config/db.js';

export async function getAll() {
  const products = await prisma.product.findMany();
  return products;
}

export async function getById(id) {
  const products = await prisma.product.findUnique({ where: { id } });
  return products;
}

export async function create(productsData) {
  const categoryExists = await prisma.category.findUnique({
    where: { id: productsData.categoryId }
  });

  if (!categoryExists) {
    const error = new Error(`CategoryId ${productsData.categoryId} not found`);
    error.status = 404;
    throw error;
  }
  const newProduct = await prisma.product.create({ data: productsData });
  return newProduct;
}

export async function update(id, updatedData) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updatedData,
    });
    return updatedProduct;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    return deletedProduct;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}