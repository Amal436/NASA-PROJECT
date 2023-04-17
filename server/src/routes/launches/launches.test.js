const request = require('supertest');
const app = require('../../app');
const { mongoConnect,mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
      beforeAll(()=>{
         mongoConnect();
      });

      afterAll(async()=>{
       await mongoDisconnect();
      })

    describe('Test Get /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app).
                get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        },70000);
    })

    describe('Test Post /launches', () => {
        test('It should respond with 201 success', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send({
                    mission: 'USS Enterprise',
                    rocket: 'NCC 1021',
                    target: 'Kepler-62 f',
                    launchDate: 'January 4 2028',
                })
                .expect('Content-Type', /json/)
                .expect(201);
        });

        test('It should catch missing required properties', () => { });
        test('should catch Invalid date', () => {
        });

    })
});
