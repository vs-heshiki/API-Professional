import request from 'supertest'
import app from '../../main/config/app'

describe('Content Type Middleware', () => {
    test('Should return default content type as json', async () => {
        app.post('/contextType', (req, res) => {
            res.send('')
        })
        await request(app)
            .post('/contextType')
            .expect('content-type', /json/)
    })

    test('Should return xml content type when forced', async () => {
        app.post('/contextType_XML', (req, res) => {
            res.type('xml')
            res.send('')
        })
        await request(app)
            .post('/contextType_XML')
            .expect('content-type', /xml/)
    })
})
