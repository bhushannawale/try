import config from "../config";

const mysql =   require("mysql")
let connPool: any;


function setUpDBConnection() {
    const poolOptions = {
        connectionLimit : config.dbConfig.connectionLimit,
        host            : config.dbConfig.host,
        user            : config.dbConfig.user,
        password        : config.dbConfig.password,
        database        : config.dbConfig.database
    };
    connPool = mysql.createPool(poolOptions);
}

function getDBConnectionPool() {
    if (!connPool) {
        setUpDBConnection();
    }
    return connPool;
}


export function executeQuery(query: string, args?: any[]) {
    if (args) {
        query = mysql.format(query, args);
    }
    return new Promise((resolve, reject) => {
        const pool = getDBConnectionPool();
        pool.query(query, (error: any, rows: any) => {
            if (!error) {
                resolve(rows);
            } else {
                reject(error);
            }
        });
    });
}