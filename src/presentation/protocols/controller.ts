import { HttpResponse } from './http'

export interface Controller<T = any> {
    handle: (Request: T) => Promise<HttpResponse>
}
