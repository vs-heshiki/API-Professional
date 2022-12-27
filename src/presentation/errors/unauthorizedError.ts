export class UnauthorizedError extends Error {
    constructor () {
        super('You not authorized! Check your credentials or create an account and try again')
        this.name = 'Unauthorized Error'
    }
}
