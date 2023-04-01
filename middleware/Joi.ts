import { NextFunction, Request, Response } from 'express'
import {ObjectSchema} from "joi";
import {IAuthor} from "../models/AuthorModel";
import {IBook} from "../models/BookModel";

import Joi from "joi"
import CustomLogger from "../library/Logging";

// const { NextFunction, Request, Response } = require('express');
// const IAuthor = require('../models/AuthorModel');
// const { IBook } = require('../models/BookModel');

// const ObjectSchema:ObjectSchema = require('joi')

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            CustomLogger.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};