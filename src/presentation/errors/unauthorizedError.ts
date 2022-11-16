export class UnauthorizedError extends Error {
    constructor () {
        super('You not authorized! Please create an account or login and try again')
        this.name = 'Unauthorized Error'
    }
}
