const mssql = require('mssql')
require('dotenv').config()

class DB {
    constructor() {
        let config = {
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            server: process.env.DB_SERVER,
            port: parseInt(process.env.DB_PORT),
            database: process.env.DB_NAME,
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        }
        this.pool = new mssql.ConnectionPool(config)
        this.initConnection()
    }

    initConnection() {
        this.pool.connect().then((_) => {
            console.log("db connected")
        });
    }

    closePoolConnection() {
        return this.pool.close()
    }

    query = async (sql, params = undefined) => {
        return new Promise((resolve, reject) => {
            const callback = (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            }
            try {
                let request = new mssql.Request(this.pool)
                request.sqlQuery = sql
                if (params) {
                    for (const param of params) {
                        request.input(param.key, param.type, param.value)
                    }
                }
                request.query(request.sqlQuery, callback)
            }
            catch (e) {
                reject(e)
            }
        }).catch(err => {
            throw err
        })
    }

    execute = async (procedureName, params = undefined) => {
        return new Promise((resolve, reject) => {
            const callback = (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            }
            try {
                let request = new mssql.Request(this.pool)
                if (params) {
                    for (const param of params) {
                        if (param.isOutput) {
                            request.output(param.key, param.type, param.value)
                        }
                        else {
                            request.input(param.key, param.type, param.value)
                        }
                    }
                }
                request.execute(procedureName, callback)
            }
            catch (e) {
                reject(e)
            }
        }).catch(err => {
            throw err
        })
    }
}

module.exports = new DB;