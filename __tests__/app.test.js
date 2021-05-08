import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {
  afterAll(async () => {
    return client.end();
  });

  /*   const expectedDinos = [
    {
      id: expect.any(Number),
      name: 'Fruitadens',
      dinorder: 'ornithischian',
      diet: 'herbivore',
      region: 'North America',
      era: 'Jurassic',
      url: '../images/fruitadens.jpeg',
      specimensFound: 4
    },
    {
      id: expect.any(Number),
      name: 'Nanuqusaurus',
      dinorder: 'saurischian',
      diet: 'herbivore',
      region: 'North America',
      era: 'Cretaceous',
      url: '../images/nanuqusaurus.jpeg',
      specimensFound: 1
    },
    {
      id: expect.any(Number),
      name: 'Giganotosaurus',
      dinorder: 'saurischian',
      diet: 'carnivore',
      region: 'South America',
      era: 'Cretaceous',
      url: '../images/giganotosaurus.jpeg',
      specimensFound: 3
    },
    {
      id: expect.any(Number),
      name: 'Afrovenator',
      dinorder: 'saurischian',
      diet: 'carnivore',
      region: 'Africa',
      era: 'Jurassic',
      url: '../images/afrovenator.jpeg',
      specimensFound: 1
    },
    {
      id: expect.any(Number),
      name: 'Massospondylus',
      dinorder: 'saurischian',
      diet: 'herbivore',
      region: 'Africa',
      era: 'Jurassic',
      url: '../images/massospondylus.jpeg',
      specimensFound: 42
    },
    {
      id: expect.any(Number),
      name: 'Australovenator',
      dinorder: 'saurischian',
      diet: 'carnivore',
      region: 'Australia',
      era: 'Cretaceous',
      url: '../images/australovenator.jpeg',
      specimensFound: 1
    },
    {
      id: expect.any(Number),
      name: 'Rahonavis',
      dinorder: 'saurischian',
      diet: 'carnivore',
      region: 'Madagascar',
      era: 'Cretaceous',
      url: '../images/rahonavis.jpeg',
      specimensFound: 1
    },
    {
      id: expect.any(Number),
      name: 'Alwalkeria',
      dinorder: 'saurischian',
      diet: 'omnivore',
      region: 'India',
      era: 'Triassic',
      url: '../images/alwalkeria.jpeg',
      specimensFound: 1
    }
  ]; */
  describe('/api/dinos', () => {
    let user; 

    beforeAll(async () => {
      execSync('npm run recreate-tables');
    
      const response = await request 
        .post('/api/auth/signup')
        .send({
          name: 'Dino Devotee',
          email: 'old@bones.gov',
          password: 'clevergirl'
        });
      
      expect(response.status).toBe(200);
      user = response.body;
    });

    let scany = 
    {
      id: expect.any(Number),
      name: 'Scansoriopteryx',
      dinorder: 'saurischian',
      diet: 'carnivore',
      region: 'China',
      era: 'Jurassic',
      url: '../images/scansoriopteryx.jpeg',
      specimensFound: 1
    };

    /*     let pachy = 
    {
      id: expect.any(Number),
      name: 'Pachycephalosaurus',
      dinorder: 'ornithischian',
      diet: 'herbivore',
      region: 'North America',
      era: 'Cretaceous',
      url: '../images/pachycephalosaurus.jpeg',
      specimensFound: 30
    }; */


    let omei = 
    {
      id: expect.any(Number),
      name: 'Omeisaurus',
      dinorder: 'saurischian',
      diet: 'herbivore',
      region: 'China',
      era: 'Jurassic',
      url: '../images/omeisaurus.jpeg',
      specimensFound: 11
    }; 

    let zhon = 
    {
      id: expect.any(Number),
      name: 'Zhongornis',
      dinorder: 'saurischian',
      diet: 'carnivore',
      region: 'China',
      era: 'Cretaceous',
      url: '../images/scansoriopteryx.jpeg',
      specimensFound: 1
    };
  

    //test 1 - post

    it('POST scany to /api/dinos', async () => {
      scany.userId = user.id;
      const response = await request
        .post('/api/dinos')
        .send(scany);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(scany);
    
      scany = response.body;
    });

    //test 2 - put 

    it('PUT updated scany to /api/dinos/:id', async () => {
      scany.diet = 'pizza';
      scany.era = 'now';

      const response = await request
        .put(`/api/dinos/${scany.id}`)
        .send(scany);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(scany);
    });

    //test 3 - get a list of resources

    it('GET a list of three resources', async () => {
      omei.userId = user.id;
      const r1 = await request.post('/api/dinos').send(omei);
      omei = r1.body;


      zhon.userId = user.id;
      const r2 = await request.post('/api/dinos').send(zhon);
      zhon = r2.body;

      const response = await request
        .get('/api/dinos');

      expect(response.status).toBe(200);
      const expected = [scany, omei, zhon].map(dino => {
        return { 
          userName: user.name,
          ...dino 
        };
      });
      
      expect(response.body).toEqual(expect.arrayContaining(expected));
    });

    it('GET zhon from /api/dinos/:id', async () => {
      const response = await request.get(`/api/dinos/${zhon.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...zhon, userName: user.name });
    });

    //delete test 

    it('DELETE scany from /api/dinos/:id', async () => {
      const response = await request.delete(`/api/dinos/${scany.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(scany);

      const getResponse = await request.get('/api/dinos');
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.find(dino => dino.id === scany.id));
    });

  });
  
  describe('seed data tests', () => {
    beforeAll(() => {
      execSync('npm run setup-db');
    });

    // If a GET request is made to /api/cats, does:
    // 1) the server respond with status of 200
    // 2) the body match the expected API data?
    it('GET /api/dinos', async () => {

      // act - make the request
      const response = await request.get('/api/dinos');

      // was response OK (200)?
      expect(response.status).toBe(200);

      // did it return some data?
      expect(response.body.length).toBeGreaterThan(0);

      // did it return the data we expected?
      expect(response.body[0]).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        dinorder: expect.any(String),
        diet: expect.any(String),
        region: expect.any(String),
        era: expect.any(String),
        url: expect.any(String),
        specimensFound: expect.any(Number),
        userId: expect.any(Number),
        userName: expect.any(String)
      });

    });

  });

});
