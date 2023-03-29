import express from 'express';
import BookController from '../controllers/BookController';
import { Schemas, ValidateJoi } from 'middleware/Joi';

export const router = express.Router();

router.post('/create', ValidateJoi(Schemas.book.create), BookController.create);
router.get('/get/:bookId', BookController.readById);
router.get('/get/', BookController.readAll);
router.patch('/update/:bookId', ValidateJoi(Schemas.book.update), BookController.update);
router.delete('/delete/:bookId', BookController.deleteById);
