import express from 'express';
import { 
    createCategoryController, 
    updateCategoryController, 
    deleteCategoryController, 
    getCategoryController, 
    getAllCategoriesController,
    getCategoryByIdController 
} from '../controllers/categoriesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
    console.log(`Categories Route - ${req.method} ${req.originalUrl}`);
    next();
});

// Public routes
router.get('/', getAllCategoriesController);
router.get('/category/:category', getCategoryController);
router.get('/id/:id', getCategoryByIdController);

// Protected routes
router.post('/', createCategoryController);
router.put('/category/:id', updateCategoryController);
router.delete('/category/:id' ,deleteCategoryController);

export default router;