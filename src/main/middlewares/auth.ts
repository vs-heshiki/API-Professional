import { ExpressMiddlewareAdapter } from '@/main/adapters/expressMiddlewareAdapter'
import { newAuthMiddleware } from '@/main/factories/middlewares/authMiddlewareFactory'

export const adminAuth = ExpressMiddlewareAdapter(newAuthMiddleware('admin'))
export const auth = ExpressMiddlewareAdapter(newAuthMiddleware())
