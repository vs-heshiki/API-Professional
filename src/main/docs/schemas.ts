import {
    signUpSchema,
    signUpParamsSchema,
    errorSchema,
    signInParamsSchema,
    signInSchema,
    surveysSchema,
    surveySchema,
    surveyAnswerSchema,
    surveyParamsSchema,
    saveSurveyParamsSchema,
    surveyResultSchema,
    surveyResultAnswerSchema
} from './schemas/'

export default {
    signUp: signUpSchema,
    signUpParams: signUpParamsSchema,
    signIn: signInSchema,
    signInParams: signInParamsSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    surveyParams: surveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
    surveyResultAnswer: surveyResultAnswerSchema,
    error: errorSchema
}
