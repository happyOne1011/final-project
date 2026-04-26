import express from "express";
import { getAllOrdersHandler,
            getOrderByIdHandler, 
            createOrderHandler,
            updateOrderHandler,
            deleteOrderHandler
 } from "../controllers/orderController.js";
 import { validateOrderId,
          validateCreateOrder,
          validateUpdateOrder
    } from "../middleware/orderValidator.js";
    import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/',  authenticate,getAllOrdersHandler);
router.get('/:id',  
    authenticate,  
    authorizeOwnership,
    validateOrderId,
    getOrderByIdHandler);
router.post('/', authenticate,validateCreateOrder, createOrderHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateOrderId,validateUpdateOrder,updateOrderHandler);
router.delete('/:id', authenticate, authorizeOwnership,validateOrderId,deleteOrderHandler);

export default router;