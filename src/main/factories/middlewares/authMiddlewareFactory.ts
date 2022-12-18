import { Middleware } from '../../../presentation/protocols/middleware'
import { AuthMiddleware } from '../../../presentation/controller/middlewares/authMiddleware'
import { newDbLoadAccountByToken } from '../usecases/account/loadAccountByToken/dbLoadAccountByTokenFactory'

export const newAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(newDbLoadAccountByToken(), role)
}
