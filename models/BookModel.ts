const mongoose = require('mongoose');
import {Schema, Document} from "mongoose";

export interface IBook {
    title: string;
    author: Schema.Types.ObjectId | string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema<IBookModel>(
    {
        title: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, required: true, ref: 'Author'}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel