import express from 'express';
import AuthorController from '../controllers/AuthorController';
import { Schemas, ValidateJoi } from 'middleware/Joi';

export const router = express.Router();

router.post('/create', ValidateJoi(Schemas.author.create), AuthorController.create);
router.get('/get/:authorId', AuthorController.readById);
router.get('/get', AuthorController.readAll);
router.patch('/update/:authorId', ValidateJoi(Schemas.author.update), AuthorController.update);
router.delete('/delete/:authorId', AuthorController.deleteById);
