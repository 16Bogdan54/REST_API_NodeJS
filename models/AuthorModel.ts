const mongoose = require('mongoose');
import {Schema} from "mongoose";


export interface IAuthor {
    name: string
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema<IAuthorModel>(
    {name: {type: String, required: true}},
    {versionKey: false}
)

const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = AuthorModel
