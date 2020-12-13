"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
const config_1 = __importDefault(require("../config"));
const mysql = require("mysql");
let connPool;
function setUpDBConnection() {
    const poolOptions = {
        connectionLimit: config_1.default.dbConfig.connectionLimit,
        host: config_1.default.dbConfig.host,
        user: config_1.default.dbConfig.user,
        password: config_1.default.dbConfig.password,
        database: config_1.default.dbConfig.database
    };
    connPool = mysql.createPool(poolOptions);
}
function getDBConnectionPool() {
    if (!connPool) {
        setUpDBConnection();
    }
    return connPool;
}
function executeQuery(query, args) {
    if (args) {
        query = mysql.format(query, args);
    }
    return new Promise((resolve, reject) => {
        const pool = getDBConnectionPool();
        pool.query(query, (error, rows) => {
            if (!error) {
                resolve(rows);
            }
            else {
                reject(error);
            }
        });
    });
}
exports.executeQuery = executeQuery;
//# sourceMappingURL=mysqlService.js.map