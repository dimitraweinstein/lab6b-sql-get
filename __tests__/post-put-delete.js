require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

const owls  = [
  {
    id: 1,
    name: 'Barn Owl',
    // image: '/barn-owl-.jpeg',
    note: 'Besides excellent vision, Barn Owls are extraordinarily sensitive to sound; their ability to locate prey by sound alone is the best of any animal ever tested.',
    // threats: 'Habitat loss, vehicle collisions',
    endangered_id: 3,
    habitat: 'Grasslands, deserts, and agricultural fields',
    price: '600'
  },
  {
    id: 2,
    name: 'Barred Owl',
    // image: '/barred-owl.jpeg',
    note: 'Barred Owls expanded their range dramatically in the 20th century to include western forests, where they now compete with Spotted Owls.',
    // threats: 'Deforestation',
    endangered_id: 3,
    habitat: 'Mixed, mature forests',
    price: 400,
  },
  {
    id: 3,
    name: 'Ferruginous Pygmy',
    // image: '/ferruginous-pygmy.jpeg',
    note: 'The Ferruginous Pygmy-Owl is one of the most widespread birds of the Neotropical lowlands; its range includes the southern tip of Texas and the south-central edge of Arizona.',
    // threats: 'Habitat loss, land conversion, and urbanization',
    endangered_id: 2,
    habitat: 'Tropical dry forests',
    price: 1300,
  },
  {
    id: 4,
    name: 'Great Horned Owl',
    // image: '/ferruginous-pygmy.jpeg',
    note: 'Great Horned Owls hunt Ospreys, Peregrine Falcons, and other types of owls, along with many other animals.',
    // threats: 'Habitat loss, land conversion, and urbanization',
    endangered_id: 1,
    habitat: 'Wide variety of habitat, including forests and fields',
    price: 1500,
  },
  {
    id: 5,
    name: 'Northern Hawk Owl',
    // image: '/ferruginous-pygmy.jpeg',
    note: 'Northern Hawk Owls can spot prey at distances up to half a mile away.',
    // threats: 'Habitat loss, land conversion, and urbanization',
    endangered_id: 2,
    habitat: 'Boreal forests',
    price: 2000,
  }
];

describe('post put and delete routes', () => {
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

    const owls  = [
      {
        id: 1,
        name: 'Barn Owl',
        // image: '/barn-owl-.jpeg',
        note: 'Besides excellent vision, Barn Owls are extraordinarily sensitive to sound; their ability to locate prey by sound alone is the best of any animal ever tested.',
        // threats: 'Habitat loss, vehicle collisions',
        endangered_id: 3,
        habitat: 'Grasslands, deserts, and agricultural fields',
        price: '600',
    
      }, {
        id: 2,
        name: 'Barred Owl',
        // image: '/barred-owl.jpeg',
        note: 'Barred Owls expanded their range dramatically in the 20th century to include western forests, where they now compete with Spotted Owls.',
        // threats: 'Deforestation',
        endangered_id: 3,
        habitat: 'Mixed, mature forests',
        price: 400,
      }, {
        id: 3,
        name: 'Ferruginous Pygmy',
        // image: '/ferruginous-pygmy.jpeg',
        note: 'The Ferruginous Pygmy-Owl is one of the most widespread birds of the Neotropical lowlands; its range includes the southern tip of Texas and the south-central edge of Arizona.',
        // threats: 'Habitat loss, land conversion, and urbanization',
        endangered_id: 2,
        habitat: 'Tropical dry forests',
        price: 1300,
      }, {
        id: 4,
        name: 'Great Horned Owl',
        // image: '/ferruginous-pygmy.jpeg',
        note: 'Great Horned Owls hunt Ospreys, Peregrine Falcons, and other types of owls, along with many other animals.',
        // threats: 'Habitat loss, land conversion, and urbanization',
        endangered_id: 1,
        habitat: 'Wide variety of habitat, including forests and fields',
        price: 1500,
      }, {
        id: 5,
        name: 'Northern Hawk Owl',
        // image: '/ferruginous-pygmy.jpeg',
        note: 'Northern Hawk Owls can spot prey at distances up to half a mile away.',
        // threats: 'Habitat loss, land conversion, and urbanization',
        endangered_id: 2,
        habitat: 'Boreal forests',
        price: 2000,
      }
    ];

    test('/POST Creates single owl', async () => {
    
      const data = await fakeRequest(app)
        .post('/owls')
        .send({
          name: 'new owl',
          note: 'some note',
          endangered: '2',
          habitat: 'forest',
          price: 1000,
          endangered_id: 2
        })
      
        .expect('Content-Type', /json/)
        .expect(200);
    
      // const dataOwls = await fakeRequest(app)
      //   .get('/owls')
      //   .expect('Content-Type', /json/);
      //   .expect(200);
    
      const newOwl = {
        'id': 6,
        'name': 'new owl',
        'note': 'some note',
        'habitat': 'forest',
        'price': '1000',
        'owner_id': 1,
        'endangered_id': 2,
      };
      expect(data.body).toEqual(newOwl);
    });
    test('/PUT Updates single owl', async () => {
    
      const data = await fakeRequest(app)
        .put('/owls/4')
        .send({
          name: 'Great Horned Owl 3',
          note: 'some note',
          endangered: '2',
          habitat: 'forest',
          price: 1000,
          endangered_id: 2
        })
      
        .expect('Content-Type', /json/)
        .expect(200);
    
      // const dataOwls = await fakeRequest(app)
      //   .get('/owls')
      //   .expect('Content-Type', /json/);
      //   .expect(200);
    
      const newOwl = {
        'id': 4,
        'name': 'Great Horned Owl 3',
        'note': 'some note',
        'habitat': 'forest',
        'price': '1000',
        'owner_id': 1,
        'endangered_id': 2,
      };
      expect(data.body).toEqual(newOwl);
    });
  });
});

