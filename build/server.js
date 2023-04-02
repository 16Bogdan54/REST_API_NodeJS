"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const Logging_1 = require("../library/Logging");
const Author_1 = require("../routes/Author");
const Book_1 = require("../routes/Book");
const app = (0, express_1.default)();
// connect to database
mongoose_1.default.connect(config_1.config.mongo.url)
    .then(() => {
    startServer();
    Logging_1.CustomLogger.info("connecting to database");
})
    .catch((error) => Logging_1.CustomLogger.error(error));
const startServer = () => {
    app.use((req, res, next) => {
        Logging_1.CustomLogger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.CustomLogger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // rules of API
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    app.use('/authors', Author_1.authorRouter);
    app.use('/books', Book_1.bookRouter);
    app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));
    app.use((req, res) => {
        const err = new Error('not found');
        Logging_1.CustomLogger.error(err);
        return res.status(404).json({ message: err.message });
    });
    http_1.default.createServer(app).listen(config_1.config.server.port, () => Logging_1.CustomLogger.info(`Server is running on port ${config_1.config.server.port}`));
};
