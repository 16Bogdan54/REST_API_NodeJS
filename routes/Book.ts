import express from "express";
import BookController from "../controllers/BookController";
import {Schemas, ValidateJoi} from '../middleware/Joi';

export const bookRouter = express.Router();

bookRouter.post('/create', ValidateJoi(Schemas.book.create), BookController.create);
bookRouter.get('/get/:bookId', BookController.readById);
bookRouter.get('/get/', BookController.readAll);
bookRouter.patch('/update/:bookId', ValidateJoi(Schemas.book.update), BookController.update);
bookRouter.delete('/delete/:bookId', BookController.deleteById);
