import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { displayFile, uploadFile } from '../controllers/fileController.js';

const router = express.Router();

router.get('/file', protectRoute,uploadFile )
router.get ('/file/:id',protectRoute,displayFile)


export default router
