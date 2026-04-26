import express from "express";
import { getAllCategoryHandler,
            getCategoryByIdHandler, 
            createCategoryHandler,
            updateCategoryHandler,
            deleteCategoryHandler
 } from "../controllers/categoryController.js";
 import { validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory} from "../middleware/categoryValidators.js";
    import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { authenticate } from '../middleware/authenticate.js';
// import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/',  getAllCategoryHandler);
router.get('/:id',  authenticate, validateCategoryId,getCategoryByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'),validateCreateCategory,createCategoryHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'),validateCategoryId,validateUpdateCategory,updateCategoryHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'),validateCategoryId,deleteCategoryHandler);

export default router;