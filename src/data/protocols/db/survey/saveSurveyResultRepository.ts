import { SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export interface SaveSurveyResultRepository {
    save: (data: SaveSurveyResultParams) => Promise<void>
}
