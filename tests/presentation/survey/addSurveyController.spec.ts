import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { AddSurvey } from '@/presentation/controller/survey/addSurvey/addSurveyControllerProtocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'
import { mockDate, mockSurveyRequest, throwError } from '@/tests/mocks'
import { mockAddSurveyStub, mockValidator } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: AddSurveyController
    validatorStub: Validator
    AddSurveyStub: AddSurvey
}

const newSut = (): SutTypes => {
    const validatorStub = mockValidator()
    const AddSurveyStub = mockAddSurveyStub()
    const sut = new AddSurveyController(AddSurveyStub, validatorStub)
    return {
        sut,
        AddSurveyStub,
        validatorStub
    }
}

describe('Add Survey Controller', () => {
    mockDate()

    test('Should call Validation with correct values', async () => {
        const { sut, validatorStub } = newSut()
        const validateSpyOn = jest.spyOn(validatorStub, 'validate')
        const httpRequest = mockSurveyRequest()
        await sut.handle(httpRequest)
        expect(validateSpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validatorStub } = newSut()
        jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
        const httpRequest = mockSurveyRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should call AddSurvey with correct values', async () => {
        const { sut, AddSurveyStub } = newSut()
        const surveySpyOn = jest.spyOn(AddSurveyStub, 'add')
        const httpRequest = mockSurveyRequest()
        await sut.handle(httpRequest)
        expect(surveySpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 500 if AddSurvey throws', async () => {
        const { sut, AddSurveyStub } = newSut()
        jest.spyOn(AddSurveyStub, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSurveyRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockSurveyRequest())
        expect(httpResponse).toEqual(noContent())
    })
})
