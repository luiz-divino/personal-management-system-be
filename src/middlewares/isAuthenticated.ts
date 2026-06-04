import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({
            error: "token not found",
        });
    }
    const [_, token] = authorization!.split(" ");
    try {
        const { sub } = jsonwebtoken.verify(
            token!,
            process.env.JWT_SECRET! as string,
        ) as IPayload;
        console.log(sub);
        req.userId = sub;
        return next();
    } catch (error) {
        res.status(401).json({
            error: "invalid token",
        });
    }
};
