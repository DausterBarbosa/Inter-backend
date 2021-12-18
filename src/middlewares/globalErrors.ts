import { NextFunction, Request, Response } from "express";

import AppError from "../shared/error/AppError";

function globalErrors(err:Error, req:Request, res:Response, next:NextFunction){
    if(err instanceof AppError){
        return res.status(err.statuscode).json({
            status: "error",
            message: err.message,
            data: err.data
        });
    }

    console.log(err);

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}

export default globalErrors;