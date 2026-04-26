import express from 'express';
import { 
  getAllProductsHandler, 
  getProductByIdHandler, 
  createProductHandler, 
  updateProductHandler, 
  deleteProductHandler 
} from '../controllers/productsController.js';
import{validateId,
       validateCreateProduct,
       validateUpdateProduct
} from '../middleware/productsValidator.js'
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { authenticate } from '../middleware/authenticate.js';
// import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();


router.get('/', getAllProductsHandler);
router.get('/:id',  authenticate ,validateId,getProductByIdHandler);
router.post(
  '/', 
  authenticate,            
  authorizeRoles('ADMIN'),
  validateCreateProduct,  
  createProductHandler         
);

router.put(
  '/:id', 
  authenticate,            
  authorizeRoles('ADMIN'),
  validateId,
  validateUpdateProduct,
  updateProductHandler
);

router.delete(
  '/:id', 
  authenticate,            
  authorizeRoles('ADMIN'), 
  validateId,
deleteProductHandler 

);

export default router;