/* eslint-disable no-console */
import client from '../lib/client.js';

// async/await needs to run in a function
run();

async function run() {

  try {

    // run a query to create tables
    await client.query(`          
      CREATE TABLE dinos (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(512) NOT NULL,
        dinorder VARCHAR(512) NOT NULL,
        diet VARCHAR(512) NOT NULL,
        region VARCHAR(512) NOT NULL,
        era VARCHAR(512) NOT NULL,
        url VARCHAR(1024) NOT NULL,
        specimens_found INTEGER NOT NULL
      );
    `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}