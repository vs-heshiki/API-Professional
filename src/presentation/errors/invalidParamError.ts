export class InvalidParamError extends Error {
    constructor (paramError: string) {
        super(`Input ${paramError} is invalid!`)
        this.name = 'InvalidParamError'
    }
}
