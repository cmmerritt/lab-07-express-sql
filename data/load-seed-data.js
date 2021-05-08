/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import users from './users.js';
import dinos from './dinos.js';

run();

async function run() {

  try {

    const data = await Promise.all(
      users.map(user => {
        return client.query(`
          INSERT INTO users (name, email, password_hash)
          VALUES ($1, $2, $3)
          RETURNING *;
        `,
        [user.name, user.email, user.password]);
      })
    );
    
    const user = data[0].rows[0];

    await Promise.all(
      dinos.map(dino => {
        return client.query(`
          INSERT INTO dinos (name, dinorder, diet, region, era, url, specimens_found, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `,
        [dino.name, dino.dinorder, dino.diet, dino.region, dino.era, dino.url, dino.specimensFound, user.id]);
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