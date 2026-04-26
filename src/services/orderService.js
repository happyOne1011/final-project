import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/orderRepo.js';

export async function getAllOrders(userId, role) {
  return getAll(userId, role);
}

export async function getOrderById(id) {
  const order = await getById(id);
  if (order) return order;
  else {
    const error = new Error(`Order ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createOrder(userId, OrderData) {
  const newOrder= await create(userId, OrderData);
  if(newOrder) return newOrder;
}

export async function updateOrder(id, updatedData) {
  const updatedOrder = await update(id, updatedData);
  if (updatedOrder) return updatedOrder;
  else {
    const error = new Error(`Order ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteOrder(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Order ${id} not found`);
    error.status = 404;
    throw error;
  }
}
