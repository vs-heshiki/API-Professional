export class EmailAlreadyTaken extends Error {
    constructor () {
        super('Email already exists!')
        this.name = 'AlreadyParamTaken'
    }
}
