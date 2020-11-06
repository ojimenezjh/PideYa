import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Auth-token');
    if(!token) return res.status(401).json('Access denied'), console.log('fail');

    const payload = jwt.verify(token, 'tokentest') as IPayload;
    console.log(payload);
    req.userId = payload._id;
    console.log(req.userId);

    next();


}