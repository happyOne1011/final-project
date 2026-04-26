import prisma from '../config/db.js';

export async function getAll() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getById(id) {
  const categories = await prisma.category.findUnique({ where: { id },
  include: {
      products: {
        // This forces Prisma to ONLY return these three fields for the products!
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });
  return categories;
}

export async function create(categoriesData) {
  try{
  const newProduct = await prisma.category.create({ data: categoriesData });
  return newProduct;
  }
  catch(error)
  {
    if(error.code === 'P2002') return null; 
    throw error;
    }
}

export async function update(id, updatedData) {
  try {
    const updatedCategories= await prisma.category.update({
      where: { id },
      data: updatedData,
    });
    return updatedCategories;
  } 
  catch (error) 
  {
    if (error.code === 'P2025')  return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedCategories = await prisma.category.delete({
      where: { id },
    });
    return deletedCategories;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}



