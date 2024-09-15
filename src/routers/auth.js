import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  sendResetEmail,
  resetPwd,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  registerUserSchema,
  sendResetEmailSchema,
  resetPwdSchema,
} from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUser),
);

router.post('/refresh', ctrlWrapper(refreshUserSession));

router.post('/logout', ctrlWrapper(logoutUser));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmail),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwd),
);

export default router;
