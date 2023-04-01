import { Request, Response} from "express";
// import {IAuthorModel} from "../models/AuthorModel";
// import {IAuthor, IAuthorModel} from "../models/AuthorModel";
// import {Model, MongooseOptions} from "mongoose";
import mongoose from "mongoose";
import AuthorModel from "../models/AuthorModel";

const create = (req: Request, res: Response) => {
    const {name} = req.body;

    const author = new AuthorModel({
        _id: new mongoose.Types.ObjectId(),
        name
    })

    return author
        .save()
        .then((author) => res.status(201).json({author}))
        .catch((error: Error) => res.status(500).json({error}))
}

const readById = (req: Request, res: Response) => {
    const id = req.params.authorId;

    return AuthorModel
        .findById(id)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
        .catch((error: Error) => res.status(500).json({ error }));
}

const readAll = (req: Request, res: Response) => {
    return AuthorModel.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error: Error) => res.status(500).json({ error }));
}

const update = (req: Request, res: Response) => {
    const id = req.params.authorId;

    return AuthorModel
        .findById(id)
        // @ts-ignore
        .then((author) => {

            if (author) {
                author.set(req.body);

                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error: Error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error: Error) => res.status(500).json({ error }));
}

const deleteById = (req: Request, res: Response) => {
    const id = req.params.authorId;

    return AuthorModel
        .findByIdAndDelete(id)
        .then((author) => (author ? res.status(201).json({ author, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error: Error) => res.status(500).json({ error }));
}

export default {create, readById, readAll, update, deleteById}