require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async done => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
    
    token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll(done => {
      return client.end(done);
    });

    test('/POST Creates single owl', async() => {
    
      const data = await fakeRequest(app)
        .post('/owls')
        .send({
          name: 'new owl',
          note: 'some note',
          endangered: true,
          habitat: 'forest',
          price: 1000
        })
        .expect('Content-Type', /json/)
        .expect(200);
    
      const dataOwls = await fakeRequest(app)
        .get('/owls')
        .expect('Content-Type', /json/)
        .expect(200);
    
      const newOwl = {
        'id': 6, 
        'name': 'new owl', 
        'note': 'some note', 
        'endangered': true, 
        'habitat': 'forest',
        'price': '1000',
        'owner_id': 1, 
      };

      expect(dataOwls.body).toContainEqual(newOwl);
    });
  });

  test('/PUT Updates single owl', async() => {
    
    const data = await fakeRequest(app)
      .put('/owls/6')
      .send({
        name: 'updated new owl',
        note: 'some note, like others',
        endangered: true,
        habitat: 'forest, mountains',
        price: 1200
      })
      .expect('Content-Type', /json/)
      .expect(200);
  
    const dataOwls = await fakeRequest(app)
      .get('/owls')
      .expect('Content-Type', /json/)
      .expect(200);
  
    const newOwl = {
      'id': 6, 
      'name': 'new owl', 
      'note': 'some note', 
      'endangered': true, 
      'habitat': 'forest',
      'price': '1000',
      'owner_id': 1, 
    };
    expect(dataOwls.body).toEqual(newOwl);
    expect(dataOwls.body).toContainEqual(newOwl);
  });
});