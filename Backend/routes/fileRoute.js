import express from 'express';
// import protectRoute from '../middlewares/protectRoute.js';
import { displayFile,allFiles, uploadFile, getPublicFiles, getAdminFile } from '../controllers/fileController.js';
// import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/files',uploadFile );
router.get('/allfiles',allFiles);
router.get ('/file/:id',displayFile);
router.get('/public-files', getPublicFiles); 
router.get('/admin/files',getAdminFile);


export default router
