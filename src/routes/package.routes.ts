import express from 'express';
import * as PackageController from '../controllers/package.controller';
import * as Middleware from '../middlewares';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/getAll', PackageController.getAllPackages);

export default router;