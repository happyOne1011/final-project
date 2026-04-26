import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../services/orderService.js';

export async function getAllOrdersHandler(req, res) {
  const { id, role } = req.user;
  let Orders = await getAllOrders(id, role);
  res.status(200).json(Orders);
}

export async function getOrderByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const Order = await getOrderById(id);
  res.status(200).json(Order);
}

export async function createOrderHandler(req, res) {
  const { items } = req.body;
  const newOrder = await createOrder( req.user.id, items );
  res.status(201).json(newOrder);
}

export async function updateOrderHandler(req, res) {
  const id = parseInt(req.params.id);
  const {  status } = req.body;
  const updatedOrder = await updateOrder(id, { status });
  res.status(200).json(updatedOrder);
}

export async function deleteOrderHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteOrder(id);
  res.status(204).send();
}
