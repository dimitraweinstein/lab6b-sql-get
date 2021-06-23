const client = require('../lib/client');
// import our seed data:
const usersData = require('./users.js');
const { rawEndangeredData, owls } = require('./owls.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      rawEndangeredData.map(endangered => {
        return client.query(`
          INSERT INTO endangered (endangered)
          VALUES ($1)
          RETURNING *;`,
        [endangered.endangered]);
      })
    );

    await Promise.all(
      owls.map(owl => {

        return client.query(`
                    INSERT INTO owls (name, note, endangered_id, habitat, price, owner_id)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [owl.name, owl.note, owl.endangered_id, owl.habitat, owl.price, user.id]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
