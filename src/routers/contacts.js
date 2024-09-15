import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', authenticate, ctrlWrapper(getAllContacts));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(getContactById));

router.post(
  '/',
  authenticate,
  upload.single('photo'),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);

router.patch(
  '/:contactId',
  authenticate,
  upload.single('photo'),
  jsonParser,
  isValidId,
  validateBody(patchContactSchema),
  ctrlWrapper(patchContact),
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContact),
);

export default router;
