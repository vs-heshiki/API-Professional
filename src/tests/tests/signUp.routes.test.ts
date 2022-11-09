import request from 'supertest'
import app from '../../main/config/app'

describe('SignUp Routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/signUp')
            .send({
                name: 'Victor',
                email: 'victor.heshiki@gmail.com',
                password: '123',
                confirmPassword: '123'
            })
            .expect(200)
    })
})
