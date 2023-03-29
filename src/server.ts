import express from 'express';
import http from 'http'
import mongoose from "mongoose";
import {config} from '../config/config'
import CustomLogger from "../library/Logging";

import {authorRouter} from "../routes/Author";
import {bookRouter} from "../routes/Book";

const router = express();

// connect to database
mongoose.connect(config.mongo.url)
    .then(() => {
        startServer()
        CustomLogger.info("connecting to database")
    })
    .catch(error => CustomLogger.error(error))

const startServer = () => {
    router.use((req, res, next) => {
        CustomLogger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            CustomLogger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`)
        })

        next()
    });

    router.use(express.urlencoded({extended: true}));
    router.use(express.json())

    // rules of API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({})
        }

        next()
    });

    router.use('/authors', authorRouter);
    router.use('/books', bookRouter);

    router.get('/ping', (req, res, next) => res.status(200).json({message: 'pong'}))

    router.use((req, res, next) => {
        const error = new Error('not found');

        CustomLogger.error(error)

        return res.status(404).json({message: error.message})
    })

    http.createServer(router).listen(config.server.port, () => CustomLogger.info(`Server is running on port ${config.server.port}`))
};