export class MissingParamError extends Error {
    constructor (paramError: string) {
        super(`Input ${paramError} is missing!`)
        this.name = 'MissingParamError'
    }
}
