import express from 'express';
import upload from '../upload.js';
import { getAboutUs, getHome, updateAbout } from '../controllers/aboutController.js';
import { updateFeatures } from '../controllers/featuresController.js';
import { updateServices} from '../controllers/servicesController.js';

const router = express.Router();

router.get('/', getHome);
router.post('/about/update', upload.single('photo'), updateAbout);
router.post('/features/update', updateFeatures);
router.post('/services/update', updateServices);


export default router;
