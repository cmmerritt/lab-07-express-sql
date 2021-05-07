/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import dinos from './dinos.js';

run();

async function run() {

  try {

    await Promise.all(
      dinos.map(dino => {
        return client.query(`
          INSERT INTO dinos (name, dinorder, diet, region, era, url, specimens_found)
          VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,
        [dino.name, dino.dinorder, dino.diet, dino.region, dino.era, dino.url, dino.specimensFound]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}