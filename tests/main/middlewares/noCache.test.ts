import request from 'supertest'
import app from '@/main/config/app'
import { noCache } from '@/main/middlewares/noCache'

describe('No Cache Middleware', () => {
    test('Should enable cors', async () => {
        app.post('/no_cache', noCache, (req, res) => {
            res.send()
        })
        await request(app)
            .post('/no_cache')
            .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
            .expect('pragma', 'no-cache')
            .expect('expires', '0')
            .expect('surrogate-control', 'no-store')
    })
})
