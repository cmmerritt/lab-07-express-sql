import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  /*   beforeAll(() => {
    execSync('npm run setup-db');
  }); */

  beforeAll(() => {
    execSync('npm run recreate-tables');
  });

  afterAll(async () => {
    return client.end();
  });

  const expectedDinos = [
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
  ];

  let nanuq = 
    {
      id: expect.any(Number),
      name: 'Nanuqusaurus',
      dinorder: 'saurischian',
      diet: 'herbivore',
      region: 'North America',
      era: 'Cretaceous',
      url: '../images/nanuqusaurus.jpeg',
      specimensFound: 1
    };


  /* let giga = [
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
  ]; */

  /*   let masso = [
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
  ]; */

  it('POST nanuq to /api/dinos', async () => {
    const response = await request
      .post('/api/dinos')
      .send(nanuq);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(nanuq);
    
    nanuq = response.body;
  });

  it('PUT updated nanuq to /api/dinos/:id', async () => {
    nanuq.specimensFound = 5000;
    nanuq.name = 'Nanuq';

    const response = await request
      .put(`/api/dinos/${nanuq.id}`)
      .send(nanuq);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(nanuq);
  });


  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it.skip('GET /api/dinos', async () => {
    // act - make the request
    const response = await request.get('/api/dinos');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expectedDinos);

  });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  it.skip('GET /api/dinos/:id', async () => {
    const response = await request.get('/api/dinos/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedDinos[1]);
  });
});