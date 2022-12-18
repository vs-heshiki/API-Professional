import { HttpRequest } from '../../presentation/protocols/http'
import { Request, Response, NextFunction } from 'express'
import { Middleware } from '../../presentation/protocols'

export const ExpressMiddlewareAdapter = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: HttpRequest = {
            body: req.body
        }
        const httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.statusCode === 200) {
            Object.assign(req, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}
