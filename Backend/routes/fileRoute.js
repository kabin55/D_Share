import express from 'express';
// import protectRoute from '../middlewares/protectRoute.js';
import { displayFile, uploadFile } from '../controllers/fileController.js';

const router = express.Router();

router.get('/files',uploadFile )
router.get ('/file/:id',displayFile)


export default router
