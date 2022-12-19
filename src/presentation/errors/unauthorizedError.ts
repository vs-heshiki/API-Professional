export class UnauthorizedError extends Error {
    constructor () {
        super('You not authorized! Please create an account or signIn and try again')
        this.name = 'Unauthorized Error'
    }
}
