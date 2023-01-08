import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'
import { mockAddSurveyRequest, mockDate, throwError } from '@/tests/mocks'
import { ValidatorSpy } from '@/tests/validations/validator/stubs/validatorStubs'
import { AddSurveySpy } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: AddSurveyController
    validatorSpy: ValidatorSpy
    addSurveySpy: AddSurveySpy
}

const newSut = (): SutTypes => {
    const validatorSpy = new ValidatorSpy()
    const addSurveySpy = new AddSurveySpy()
    const sut = new AddSurveyController(addSurveySpy, validatorSpy)
    return {
        sut,
        addSurveySpy,
        validatorSpy
    }
}

describe('Add Survey Controller', () => {
    const request = mockAddSurveyRequest()

    mockDate()

    test('Should call Validation with correct values', async () => {
        const { sut, validatorSpy } = newSut()
        await sut.handle(request)
        expect(request).toBe(validatorSpy.input)
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validatorSpy } = newSut()
        validatorSpy.resolve = new Error()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(badRequest(validatorSpy.resolve))
    })

    test('Should call AddSurvey with correct values', async () => {
        const { sut, addSurveySpy } = newSut()
        await sut.handle(request)
        expect(addSurveySpy.addSurveyParams).toEqual({ ...request, date: new Date() })
    })

    test('Should return 500 if AddSurvey throws', async () => {
        const { sut, addSurveySpy } = newSut()
        jest.spyOn(addSurveySpy, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(noContent())
    })
})
