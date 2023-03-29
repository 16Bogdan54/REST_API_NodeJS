import express from 'express';
import AuthorController from '../controllers/AuthorController';
import { Schemas, ValidateJoi } from 'middleware/Joi';

export const authorRouter = express.Router();

authorRouter.post('/create', ValidateJoi(Schemas.author.create), AuthorController.create);
authorRouter.get('/get/:authorId', AuthorController.readById);
authorRouter.get('/get', AuthorController.readAll);
authorRouter.patch('/update/:authorId', ValidateJoi(Schemas.author.update), AuthorController.update);
authorRouter.delete('/delete/:authorId', AuthorController.deleteById);
