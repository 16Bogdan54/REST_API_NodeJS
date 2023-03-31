import { Request, Response } from 'express';
import * as Mongoose from "mongoose";
const mongoose:Mongoose = require('mongoose');
const BookModel = require('../models/BookModel');

const create = (req: Request, res: Response) => {
    const { author, title } = req.body;

    const book = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

const readById = (req: Request, res: Response) => {
    const id = req.params.bookId;

    return BookModel.findById(id)
        .populate('author')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
    return BookModel.find()
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};

const update = (req: Request, res: Response) => {
    const id = req.params.bookId;

    return BookModel.findById(id)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteById = (req: Request, res: Response) => {
    const id = req.params.bookId;

    return BookModel.findByIdAndDelete(id)
        .then((book) => (book ? res.status(201).json({ book, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { create, readById, readAll, update, deleteById };