import {Request, Response} from "express";

import UserService from "./user.service";

class UserController{
    async signin(req:Request, res:Response){
        const {email, password} = req.body;

        const userService = new UserService();

        const user = await userService.signin({email, password});

        return res.status(200).json(user);
    }

    async signup(req:Request, res:Response){
        const userService = new UserService();

        const user = await userService.signup(req.body);

        return res.status(200).json(user);
    }

    async me(req:Request, res:Response){
        const userService = new UserService();

        const user = await userService.me(req.user);

        return res.status(200).json(user);
    }
}

export default new UserController();