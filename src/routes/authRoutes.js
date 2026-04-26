import express from 'express';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogIn, logInHandler);
export default router;
