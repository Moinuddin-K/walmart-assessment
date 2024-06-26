import express from 'express';
import ItemController from '../controller/ItemController.js'
const router = express.Router();

router.get('/items', ItemController.getPaginatedItems);
router.post('/items', ItemController.addItem);
router.put('/items/:id', ItemController.updateItem);
router.delete('/items/:id', ItemController.deleteItem);
router.delete('/items', ItemController.deleteAllItems);

export default router;
