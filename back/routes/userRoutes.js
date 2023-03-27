import { Router } from 'express';
import {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getAnnoncesByUser,
} from '../controllers/userController.js';

const router = new Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/:userId/annonces', getAnnoncesByUser);

export default router;