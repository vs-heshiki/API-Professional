import { ExpressMiddlewareAdapter } from './../adapters/expressMiddlewareAdapter'
import { newAuthMiddleware } from './../factories/middlewares/authMiddlewareFactory'

export const adminAuth = ExpressMiddlewareAdapter(newAuthMiddleware('admin'))
export const auth = ExpressMiddlewareAdapter(newAuthMiddleware())
