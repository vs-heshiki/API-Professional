import { newDbLoadAccountByToken } from '@/main/factories/usecases/account/loadAccountByToken/dbLoadAccountByTokenFactory'
import { Middleware } from '@/presentation/protocols/middleware'
import { AuthMiddleware } from '@/presentation/controller/middlewares/authMiddleware'

export const newAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(newDbLoadAccountByToken(), role)
}
