import request from 'supertest'
import app from '../../../main/config/app'

describe('Body Parser Middleware', () => {
    test('Should parse body as json', async () => {
        app.post('/bodyParser', (req, res) => {
            res.send(req.body)
        })
        await request(app)
            .post('/bodyParser')
            .send({ name: 'Victor' })
            .expect({ name: 'Victor' })
    })
})
