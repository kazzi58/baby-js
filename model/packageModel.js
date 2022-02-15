const express = require('express');
const DB = require('../db')

const mssql = require('mssql');
const res = require('express/lib/response');
require('dotenv').config()

const table_name = process.env.TABLE_NAME;
console.log('hello - ' + table_name)


const getFreeMinute = async (msisdn, serviceName) => {
    const sql = `SELECT id, freeMinute FROM [ncell].[dbo].[${table_name}] WHERE msisdn = '${msisdn}' and service_name = '${serviceName}'`

    console.log("debug - " + sql)
    console.log('kazi - ' + table_name);

    try {
        
        const results = await DB.query(
            sql, [
            {
                key: 'msisdn',
                type: mssql.NChar,
                value: msisdn
            }
        ]
        )
        console.log(results)
        // var resultArray = Object.values(results);
        // console.log('res debug - ' + resultArray)
        console.log('length = ' + results.recordset.length)

        if (results && results.recordset.length > 0) {
            var id = results.recordset[0].id
            var freeMinute = results.recordset[0].freeMinute
            return id + ";" + freeMinute;
        }
        return "-1;-1"
    } catch (e) {
        // LoggerError.log(e)
        console.log(e)
        return undefined
    }
}

const subscribeService = async (msisdn, serviceName, packageName) => {
    const select_sql = `SELECT * FROM [ncell].[dbo].[test_profile_2] WHERE msisdn = '${msisdn}' and service_name = '${serviceName}' and package_name='${packageName}'`

    const insert_sql = `INSERT INTO [ncell].[dbo].[test_profile_2] VALUES ('${msisdn}', '${serviceName}', '${packageName}', 245, 200, NULL, NULL, 120)`

    console.log("debug - " + select_sql)
    console.log('insert-sql = ' + insert_sql)

    try {
        
        const results = await DB.query(
            select_sql
        )

        // console.log(results)
        // var resultArray = Object.values(results);
        // console.log('res debug - ' + resultArray)
        console.log('length = ' + results.recordset.length)

        if (results && results.recordset.length > 0) {
            // already subscribed, update existing info
            // res.send('Already subscribed!')
            console.log('already subscribed')
            return 0;
        }
        else {
            // user not registered; register here
            console.log('inserting...')
            const test = await DB.query(insert_sql)
            return 1;
        }
    } catch (e) {
        // LoggerError.log(e)
        console.log(e)
        return undefined
    }
}

const unSubscribe = async (msisdn, serviceName) => {
    const select_sql = `SELECT * FROM [ncell].[dbo].[test_profile_2] WHERE msisdn = '${msisdn}' and service_name = '${serviceName}'`

    const delete_sql = `DELETE FROM [ncell].[dbo].[test_profile_2] WHERE msisdn='${msisdn}' and service_name='${serviceName}'`

    console.log("debug - " + delete_sql)
    // console.log('insert-sql = ' + insert_sql)

    try {
        
        const results = await DB.query(select_sql)

        console.log('debug length - ' + results.recordset.length)

        // console.log(results)
        // var resultArray = Object.values(results);
        // console.log('res debug - ' + resultArray)
        // console.log('length = ' + results.recordset.length)

        // return 1;

        if (results && results.recordset.length > 0) {
            // already subscribed, delete info
            const delete_result = await DB.query(delete_sql)

            // console.log('already subscribed')
            return 1;
        }
        else {
            // no user found
            // console.log('inserting...')
            // const test = await DB.query(insert_sql)
            return 0;
        }
    } catch (e) {
        // LoggerError.log(e)
        console.log(e)
        return 0;
    }
}

const calculateFreeMinuteModel = async (msisdn, serviceName, callDuration) => {
    const sql = `SELECT id, freeMinute FROM [ncell].[dbo].[test_profile_2] WHERE msisdn = '${msisdn}' and service_name = '${serviceName}'`

    console.log("debug - " + sql)

    try {
        
        const results = await DB.query(
            sql, [
            {
                key: 'msisdn',
                type: mssql.NChar,
                value: msisdn
            }
        ]
        )
        console.log(results)
        // var resultArray = Object.values(results);
        // console.log('res debug - ' + resultArray)
        console.log('length = ' + results.recordset.length)

        if (results && results.recordset.length > 0) {
            var id = results.recordset[0].id
            var freeMinute = results.recordset[0].freeMinute
            var freeMinuteInt = parseInt(freeMinute)

            if (freeMinuteInt>callDuration){
                freeMinuteInt = freeMinuteInt - callDuration;
            }

            else {
                freeMinuteInt = 0;
            }

            const update_sql = `UPDATE [ncell].[dbo].[test_profile_2] SET freeMinute = '${freeMinuteInt}' WHERE msisdn='${msisdn}'`

            const updated_results = await DB.query(update_sql);

            return id + ";" + freeMinuteInt;
        }

        else {
            return "-1;-1"
        }
        
    } catch (e) {
        // LoggerError.log(e)
        console.log(e)
        return undefined
    }
}



module.exports = {getFreeMinute, subscribeService, unSubscribe, calculateFreeMinuteModel};
