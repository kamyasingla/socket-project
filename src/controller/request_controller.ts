import { Request, Response } from "express";
import { readFile, writeFile } from "jsonfile";
import { existsSync } from "fs";
import { NextFunction } from "connect";

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export let postRequest = (req: Request, res: Response, next: NextFunction) => {
    
    const file = 'data.json';
    let userKey: string = req.body.key;
    let value: string = req.body.data;
    var requestObj = {
        [userKey] : value
    };
    if (existsSync(file)) {
        readFile(file, function (err, obj) {
            if (err) console.error(err);
            requestObj = Object.assign(requestObj, obj); 
            
            writeFile(file, requestObj, function (err) {
                res.send(requestObj);
                next();
                if (err) console.error(err);
            });
        });
    }  else {
        writeFile(file, requestObj, function (err) {
            res.send(requestObj);
            next();
            if (err) console.error(err);
        });
    }
};

export let getRequest = (req: Request, res: Response) => {
    const file = 'data.json';

    if (existsSync(file)) {
        readFile(file, function (err, obj) {
            if (err) console.error(err);
            var val = obj[req.params.key];
            if(val == undefined) {
                res.status(404).json({
                    error: "Key not found"
                });
            } else {
                res.status(200).json({
                    [req.params.key] : val
                });
            }
        });
    } else {
        res.status(404).json({
            error: "Key not found"
        });
    }
};
