import express from 'express';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById

} from '../controllers/productController.js';
import {protect,authorizeRoles} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',getAllProducts);

// Admin only
router.post('/',protect,authorizeRoles('admin'),createProduct);
router.put('/:id',protect,authorizeRoles('admin'),updateProduct);
router.delete('/:id',protect,authorizeRoles('admin'),deleteProduct);
router.get("/:id", getProductById);

export default router;