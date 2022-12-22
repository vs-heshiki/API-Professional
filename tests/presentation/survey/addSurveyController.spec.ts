import mockdate from 'mockdate'
import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { CreateSurvey, CreateSurveyModel } from '@/presentation/controller/survey/addSurvey/addSurveyControllerProtocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validator } from '@/validations/protocols/validator'

const newFakeRequest = (): HttpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answers: 'any_answer'
        }],
        date: new Date()
    }
})

const newValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate (input: any): Error | null {
            return null
        }
    }
    return new ValidatorStub()
}

const newCreateSurveyStub = (): CreateSurvey => {
    class CreateSurveyStub implements CreateSurvey {
        async create (data: CreateSurveyModel): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new CreateSurveyStub()
}

type SutTypes = {
    sut: AddSurveyController
    validatorStub: Validator
    createSurveyStub: CreateSurvey
}

const newSut = (): SutTypes => {
    const validatorStub = newValidator()
    const createSurveyStub = newCreateSurveyStub()
    const sut = new AddSurveyController(createSurveyStub, validatorStub)
    return {
        sut,
        createSurveyStub,
        validatorStub
    }
}

describe('Add Survey Controller', () => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })
    test('Should call Validation with correct values', async () => {
        const { sut, validatorStub } = newSut()
        const validateSpyOn = jest.spyOn(validatorStub, 'validate')
        const httpRequest = newFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validatorStub } = newSut()
        jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
        const httpRequest = newFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should call CreateSurvey with correct values', async () => {
        const { sut, createSurveyStub } = newSut()
        const surveySpyOn = jest.spyOn(createSurveyStub, 'create')
        const httpRequest = newFakeRequest()
        await sut.handle(httpRequest)
        expect(surveySpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 500 if CreateSurvey throws', async () => {
        const { sut, createSurveyStub } = newSut()
        jest.spyOn(createSurveyStub, 'create').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(noContent())
    })
})
