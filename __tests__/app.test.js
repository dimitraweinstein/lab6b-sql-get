require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
// const owls = require('../data/owls');
const app = require('../lib/app');
const client = require('../lib/client');

const owls  = [
  {
    id: 4,
    name: 'Great Horned Owl',
    note: 'Great Horned Owls hunt Ospreys, Peregrine Falcons, and other types of owls, along with many other animals.',
    endangered_id: 1,
    habitat: 'Wide variety of habitat, including forests and fields',
    price: '1500',
    endangered: 'critical'
  },
  {
    id: 5,
    name: 'Northern Hawk Owl',
    note: 'Northern Hawk Owls can spot prey at distances up to half a mile away.',
    endangered_id: 2,
    habitat: 'Boreal forests',
    price: '2000',
    endangered: 'moderate'
  },
  {
    id: 3,
    name: 'Ferruginous Pygmy',
    note: 'The Ferruginous Pygmy-Owl is one of the most widespread birds of the Neotropical lowlands; its range includes the southern tip of Texas and the south-central edge of Arizona.',
    endangered_id: 2,
    habitat: 'Tropical dry forests',
    price: '1300',
    endangered: 'moderate'
  },
  {
    id: 2,
    name: 'Barred Owl',
    note: 'Barred Owls expanded their range dramatically in the 20th century to include western forests, where they now compete with Spotted Owls.',
    endangered_id: 3,
    habitat: 'Mixed, mature forests',
    price: '400',
    endangered: 'none'
  },
  {
    id: 1,
    name: 'Barn Owl',
    note: 'Besides excellent vision, Barn Owls are extraordinarily sensitive to sound; their ability to locate prey by sound alone is the best of any animal ever tested.',
    endangered_id: 3,
    habitat: 'Grasslands, deserts, and agricultural fields',
    price: '600',
    endangered: 'none'
  }
];

describe('get routes', () => {
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

    // test('/GET owls returns all owls', async() => {

    //   const expectation =  owls;

    //   const data = await fakeRequest(app)
    //     .get('/owls')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });

    test('/GET owls returns all owls data', async() => {

      const expectation = owls;

      const data = await fakeRequest(app)
        .get('/owls')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });


    test('/GET owls/1 returns an owl', async() => {

      const expectation =   {
        id: 1,
        name: 'Barn Owl',
        note: 'Besides excellent vision, Barn Owls are extraordinarily sensitive to sound; their ability to locate prey by sound alone is the best of any animal ever tested.',
        endangered_id: 3,
        habitat: 'Grasslands, deserts, and agricultural fields',
        price: '600',
        endangered: 'none'
      };

      const data = await fakeRequest(app)
        .get('/owls/1')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(data.body).toEqual(expectation);
    });
  });
});