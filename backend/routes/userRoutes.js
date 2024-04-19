import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getSearchUser, getUsersForSidebar } from '../controllers/userController.js';

const router= express.Router();

router.get("/",protectRoute,getUsersForSidebar)
router.get("/search",protectRoute,getSearchUser)
export default router;