export class ServerError extends Error {
    constructor (stack?: string) {
        super('Internal Server Error! Please try again later')
        this.name = 'ServerError'
        this.stack = stack
    }
}
