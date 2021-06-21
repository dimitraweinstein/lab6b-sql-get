const client = require('../lib/client');
// import our seed data:
const owls = require('./owls.js');
const usersData = require('./users.js');
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
      owls.map(owl => {
        return client.query(`
                    INSERT INTO owls (name, note, endangered, habitat, price, owner_id)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [owl.name, owl.note, owl.endangered, owl.habitat, owl.price, user.id]);
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
