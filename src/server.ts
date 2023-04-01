import {NextFunction, Request, Response} from "express";
import express from "express";
import http from 'http'
import mongoose from 'mongoose';
import {config} from '../config/config'
import CustomLogger from '../library/Logging'
import {authorRouter} from "../routes/Author";
import {bookRouter} from "../routes/Book";

const app = express();

// connect to database
mongoose.connect(config.mongo.url)
    .then(() => {
        startServer()
        CustomLogger.info("connecting to database")
    })
    .catch((error:Error) => CustomLogger.error(error))

const startServer = () => {
    app.use((req:Request, res:Response, next:NextFunction) => {
        CustomLogger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            CustomLogger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`)
        })

        next()
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json())

    // rules of API
    app.use((req:Request, res:Response, next:NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({})
        }

        next()
    });

    app.use('/authors', authorRouter);
    app.use('/books', bookRouter);

    app.get('/ping', (req:Request, res:Response) => res.status(200).json({message: 'pong'}))

    app.use((req:Request, res:Response) => {
        const error:Error = new Error('not found');

        CustomLogger.error(error)

        return res.status(404).json({message: error.message})
    })

    http.createServer(app).listen(config.server.port, () => CustomLogger.info(`Server is running on port ${config.server.port}`))
};