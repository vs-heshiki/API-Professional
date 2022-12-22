import { LogControllerDecorator } from '@/main/decorators/logControllerDecorator'
import { LogMongoRepository } from '@/infra/db/mongodb/logRepository/logMongoRepository'
import { Controller } from '@/presentation/protocols/controller'

export const newLogControllerDecorator = (controller: Controller): Controller => {
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(controller, logMongoRepository)
}
