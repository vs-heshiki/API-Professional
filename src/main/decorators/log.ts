import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator {
    private readonly controller: Controller

    constructor (controller: Controller) {
        this.controller = controller
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const response = await this.controller.handle(httpRequest)
        if (response.statusCode === 500) {
            return
        }
        return response
    }
}
