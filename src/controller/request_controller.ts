import { Request, Response } from "express";
import { readFile, writeFile } from "jsonfile";
import { existsSync } from "fs";
import { NextFunction } from "connect";

//POST given JSON data 
export let postRequest = (req: Request, res: Response, next: NextFunction) => {
    
    const file = 'data.json';
    let userKey: string = req.body.key;
    let value: string = req.body.data;
    var requestObj = {
        [userKey] : value
    };
    //check if the file exists
    if (existsSync(file)) {
        //read file
        readFile(file, function (err, obj) {
            if (err) console.error(err);
            //assign new data to an obj
            requestObj = Object.assign(requestObj, obj); 
            //update the text file with the new content
            writeFile(file, requestObj, function (err) {
                res.send(requestObj);
                next();
                if (err) console.error(err);
            });
        });
    }  else {
        //if file does not exist, create file and write data into it
        writeFile(file, requestObj, function (err) {
            res.send(requestObj);
            next();
            if (err) console.error(err);
        });
    }
};

//GET single data for a given key
export let getRequest = (req: Request, res: Response) => {
    const file = 'data.json';

    //check if file exists
    if (existsSync(file)) {
        //read file
        readFile(file, function (err, obj) {
            if (err) console.error(err);
            var val = obj[req.params.key];
            //check if key undefined
            if(val == undefined) {
                res.status(404).json({
                    error: "Key not found"
                });
            } else { //give the required data value
                res.status(200).json({
                    [req.params.key] : val
                });
            }
        });
    } else { //if file does not exist, return error
        res.status(404).json({
            error: "Key not found"
        });
    }
};
