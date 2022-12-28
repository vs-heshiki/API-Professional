import {
    signInPath,
    signUpPath,
    surveyPath,
    surveyResultPath
} from './paths/'

export default {
    '/sign_up': signUpPath,
    '/sign_in': signInPath,
    '/survey': surveyPath,
    '/survey/{surveyId}/results': surveyResultPath
}
