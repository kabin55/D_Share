// import express from 'express';
// import protectRoute from '../middlewares/protectRoute.js';
// import { displayFile,allFiles, uploadFile, getPublicFiles, getAdminFile } from '../controllers/fileController.js';
import protectRoute from "../middlewares/protectRoute.js";

// const router = express.Router();

// router.get('/files',uploadFile );
// router.get('/allfiles',allFiles);
// router.get ('/file/:id',displayFile);
// router.get('/public-files', getPublicFiles);
// router.get('/admin/files',getAdminFile);

// export default router

// import express from "express";
// import {
//   displayFile,
//   allFiles,
//   uploadFile,
//   getPublicFiles,
//   getAdminFile,
//   getRecentFiles, // <-- import new controller function
// } from "../controllers/fileController.js";

// const router = express.Router();

// router.get("/files", uploadFile);
// router.get("/allfiles", allFiles);
// router.get("/file/:id", displayFile);
// router.get("/public-files", getPublicFiles);
// router.get("/admin/files", getAdminFile);

// New route for recent 8 files
// router.get("/recent-files", getRecentFiles);

// export default router;

import express from "express";
import {
  displayFile,
  allFiles,
  uploadFile,
  getPublicFiles,
  getAdminFile,
  getRecentFiles,
  getTotalFilesCount,
} from "../controllers/fileController.js";

const router = express.Router();

router.get("/files", uploadFile);
router.get("/allfiles", allFiles);
router.get("/file/:id", displayFile);
router.get("/public-files", getPublicFiles);
router.get("/admin/files", getAdminFile);
router.get("/recent-files", getRecentFiles);

// ✅ Add this new route for total file count
router.get("/total-files", getTotalFilesCount);

export default router;
