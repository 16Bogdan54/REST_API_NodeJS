import express from 'express';
import http from 'http'
import mongoose from "mongoose";
import {config} from '../config/config'
import CustomLogger from "../library/Logging";

const router = express();

// connect to database
mongoose.connect(config.mongo.url)
    .then(() => CustomLogger.info("connecting to database"))
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


}