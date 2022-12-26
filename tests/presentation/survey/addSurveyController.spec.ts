import mockdate from 'mockdate'
import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { AddSurvey, AddSurveyParams } from '@/presentation/controller/survey/addSurvey/addSurveyControllerProtocols'
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

const newAddSurveyStub = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
        async add (data: AddSurveyParams): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new AddSurveyStub()
}

type SutTypes = {
    sut: AddSurveyController
    validatorStub: Validator
    AddSurveyStub: AddSurvey
}

const newSut = (): SutTypes => {
    const validatorStub = newValidator()
    const AddSurveyStub = newAddSurveyStub()
    const sut = new AddSurveyController(AddSurveyStub, validatorStub)
    return {
        sut,
        AddSurveyStub,
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

    test('Should call AddSurvey with correct values', async () => {
        const { sut, AddSurveyStub } = newSut()
        const surveySpyOn = jest.spyOn(AddSurveyStub, 'add')
        const httpRequest = newFakeRequest()
        await sut.handle(httpRequest)
        expect(surveySpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 500 if AddSurvey throws', async () => {
        const { sut, AddSurveyStub } = newSut()
        jest.spyOn(AddSurveyStub, 'add').mockImplementationOnce(async () => {
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
