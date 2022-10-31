export class ServerError extends Error {
    constructor () {
        super('Internal Server Error! Please try again later')
        this.name = 'ServerError'
    }
}
