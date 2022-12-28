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
    surveyResultSchema
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
    error: errorSchema
}
