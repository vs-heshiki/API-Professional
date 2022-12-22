import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
    test('Should enable cors', async () => {
        app.post('/cors', (req, res) => {
            res.send()
        })
        await request(app)
            .post('/cors')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-methods', '*')
            .expect('access-control-allow-headers', '*')
    })
})
