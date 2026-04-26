import {  getOrderById
 } from '../services/orderService.js';

export async function authorizeOwnership(req, res, next) {
  if (req.user.role === 'ADMIN') {
      return next();
    }
  const id = parseInt(req.params.id);
  const order = await getOrderById(id);
  if (order.userId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}
