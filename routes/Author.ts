const express = require('express');
const AuthorController = require('../controllers/AuthorController');
const { Schemas, ValidateJoi } = require('../middleware/Joi');

const authorRouter = express.Router();

authorRouter.post('/create', ValidateJoi(Schemas.author.create), AuthorController.create);
authorRouter.get('/get/:authorId', AuthorController.readById);
authorRouter.get('/get', AuthorController.readAll);
authorRouter.patch('/update/:authorId', ValidateJoi(Schemas.author.update), AuthorController.update);
authorRouter.delete('/delete/:authorId', AuthorController.deleteById);

module.exports = authorRouter